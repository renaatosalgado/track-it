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

  function UpdateHabits() {
    getTodayHabits(config).then((res) => setTodayHabits(res.data));
  }

  function checkHabit(habit) {
    if (habit.done === false) {
      postCheckHabit(habit.id, config).then(() => {
        UpdateHabits();
        calculateDailyProgress();
      });
    } else {
      postUncheckHabit(habit.id, config).then(() => {
        UpdateHabits();
      });
    }
  }

  function calculateDailyProgress() {
    const total =
      (todayHabits.filter((e) => e.done === true).length / todayHabits.length) *
      100;
    setDailyProgress(total);
  }

  calculateDailyProgress();

  return (
    <>
      <Header />
      <Container>
        <TodayHeader>
          <Weekday>{today}</Weekday>
          <TodayMessage progress={dailyProgress}>
            {dailyProgress === 0
              ? "Nenhum hábito concluído ainda"
              : `${Math.round(dailyProgress)}% dos hábitos concluídos`}
          </TodayMessage>
        </TodayHeader>
        {todayHabits.map((habit, index) => (
          <HabitBox key={index}>
            <Info>
              <HabitName>{habit.name}</HabitName>
              <Sequency
                highscore={
                  habit.currentSequence === habit.highestSequence &&
                  habit.highestSequence !== 0
                }
              >
                Sequência atual: <span>{habit.currentSequence} dias</span>
              </Sequency>
              <Record
                highscore={
                  habit.currentSequence === habit.highestSequence &&
                  habit.highestSequence !== 0
                }
              >
                Seu recorde: <span>{habit.highestSequence} dias</span>
              </Record>
            </Info>
            <Check done={habit.done}>
              <ion-icon
                name="checkbox"
                onClick={() => {
                  checkHabit(habit);
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
  color: ${(props) => (props.progress > 0 ? "#8fc549" : "#bababa")};
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

  span {
    color: ${(props) => (props.highscore ? "#8fc549" : "#666666")};
  }
`;

const Record = styled.p`
  color: #666666;
  font-size: 13px;

  span {
    color: ${(props) => (props.highscore ? "#8fc549" : "#666666")};
  }
`;

const Check = styled.div`
  margin-right: 8px;

  ion-icon {
    color: ${(props) => (props.done ? "#8fc549" : "#ebebeb")};
    border-radius: 5px;
    width: 69px;
    height: 69px;

    :hover {
      color: #8fc549;
      cursor: pointer;
    }
  }
`;
