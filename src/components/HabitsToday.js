import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Bottom from "./Bottom";
import Header from "./Header";
import {
  getTodayHabits,
  postCheckHabit,
  postUncheckHabit,
} from "../services/API";
import UserContext from "../contexts/UserContext";
import DailyProgressContext from "../contexts/DailyProgressContext";

export default function HabitsToday() {
  const day = dayjs().date();
  const month = dayjs().month() + 1;
  const year = dayjs().year();
  const numberWeekday = dayjs().day();
  let weekday = "";

  switch (numberWeekday) {
    case 0:
      weekday = "Domingo";
      break;
    case 1:
      weekday = "Segunda";
      break;
    case 2:
      weekday = "Terça";
      break;
    case 3:
      weekday = "Quarta";
      break;
    case 4:
      weekday = "Quinta";
      break;
    case 5:
      weekday = "Sexta";
      break;
    case 6:
      weekday = "Sábado";
      break;

    default:
      weekday = "";
      break;
  }

  const today = `${weekday}, ${day}/${month}/${year}`;

  const { user } = useContext(UserContext);

  const { dailyProgress, setDailyProgress } = useContext(DailyProgressContext);

  const [todayHabits, setTodayHabits] = useState([]);
  const [checkedHabits, setCheckedHabits] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  useEffect(() => {
    getTodayHabits(config).then((res) => {
      setTodayHabits(res.data);
    });
    //eslint-disable-next-line
  }, []);

  function checkHabit(habit) {
    console.log('entrada', habit)
    if (habit.done === true) {
      postUncheckHabit(habit.id, config).then(() => {
        habit.currentSequence--;
        const filteredHabits = checkedHabits.filter((h) => h !== habit.id);
        setCheckedHabits(filteredHabits);
        console.log("caiu no uncheck");
      });
    } else {
      postCheckHabit(habit.id, config).then(() => {
        habit.currentSequence++;
        setCheckedHabits([...checkedHabits, habit.id]);
        console.log("caiu no check");
      });
    }
    if (habit.currentSequence > habit.highestSequence) {
      habit.highestSequence = habit.currentSequence;
    }
    calculateDailyProgress();
    console.log("checked", checkedHabits);
    console.log("today", todayHabits);
  }

  function calculateDailyProgress() {
    const total = (checkedHabits.length / todayHabits.length) * 100;
    setDailyProgress(total);
    console.log("progress", dailyProgress);
  }

  return (
    <>
      <Header />
      <Container>
        <TodayHeader>
          <Weekday>{today}</Weekday>
          <TodayMessage>
            {checkedHabits.length === 0 || todayHabits.length === 0
              ? "Nenhum hábito concluído ainda"
              : `${dailyProgress}% dos hábitos concluídos`}
          </TodayMessage>
        </TodayHeader>
        {todayHabits.map((habit, index) => (
          <HabitBox key={index}>
            <Info>
              <HabitName>{habit.name}</HabitName>
              <Sequency>Sequência atual: {habit.currentSequence} dias</Sequency>
              <Record>Seu recorde: {habit.highestSequence} dias</Record>
            </Info>
            <Check>
              <ion-icon
                name="checkbox"
                onClick={() => {
                  checkHabit(habit);
                  // calculateDailyProgress();
                }}
                checkedHabit={() => {
                  return habit.done ? true : false
                }}
              ></ion-icon>
            </Check>
          </HabitBox>
        ))}
      </Container>
      <Bottom />
    </>
  );
}

const Container = styled.div`
  background-color: #f2f2f2;
  width: 100%;
  height: 100vh;
  margin-top: 70px;
  margin-bottom: 70px;
  font-family: "Lexend Deca", sans-serif;
`;

const TodayHeader = styled.div`
  width: calc((100vw - 36px));
  border-radius: 5px;
  padding-top: 28px;
  margin-left: 18px;
`;

const Weekday = styled.div`
  font-size: 23px;
  color: #126ba5;
  line-height: 29px;
`;
const TodayMessage = styled.div`
  font-size: 18px;
  color: #bababa;
  line-height: 23px;
`;

const HabitBox = styled.div`
  width: calc((100vw - 36px));
  height: 94px;
  border-radius: 5px;
  background-color: #ffffff;
  margin: 28px auto 19px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 18px;
`;

const HabitName = styled.p`
  color: #666666;
  font-size: 20px;
  margin-bottom: 7px;
`;

const Sequency = styled.p`
  color: #666666;
  font-size: 13px;
`;

const Record = Sequency;

const Check = styled.div`
  margin-right: 8px;

  ion-icon {
    color: ${(props) => (props.checkedHabit ? "#8fc549" : "#ebebeb")};
    border-radius: 5px;
    width: 69px;
    height: 69px;

    :hover {
      color: #8fc549;
      cursor: pointer;
    }
  }
`;
