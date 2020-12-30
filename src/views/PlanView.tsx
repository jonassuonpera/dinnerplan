import React, { useState, useEffect } from 'react'
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { PlanDay } from '../components/plan/PlanDay';
import { timeUtil } from '../util/timeUtil';
import { Button } from '../components/global/Button';
import { ArrowLeft } from '../images/arrow-left';
import { ArrowRight } from '../images/arrow-right';
import { Plan } from '../interfaces/planInterface';

const PLANS = gql`
query MyQuery {
  plan {
    week_number
    dish_monday {
      name
      recipe
      dish_ingredients {
        ingredient {
          name
        }
      }
    }
  }
  }
`;

export default function PlanView() {

  const [dateView, setDateView] = useState(new Date());

  const [weekNumber, setWeekNumber] = useState(timeUtil(dateView));

  const [weekPlan, setWeekPlan] = useState<Plan>();

  const { loading, error, data } = useQuery(PLANS);

  const updateWeekPlan = (newWeek: number) => {
    setWeekPlan({});
    if (data) {
      data.plan.filter((obj: Plan) => {
        if (obj.week_number === newWeek) {
          setWeekPlan(obj);
        }
      });
    }
  }

  useEffect(() => {
    if (data) {
      data.plan.filter((obj: Plan) => {
        if (obj.week_number === weekNumber) {
          setWeekPlan(obj);
        }
      });
    }
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const goToPreviousWeek = () => {
    let currentDateMinusOneWeek = dateView;
    currentDateMinusOneWeek.setDate(currentDateMinusOneWeek.getDate() - 1 * 7);
    setDateView(currentDateMinusOneWeek);
    const newWeek = timeUtil(currentDateMinusOneWeek);
    setWeekNumber(newWeek);
    updateWeekPlan(newWeek);
  }

  const goToNextWeek = () => {
    let currentDatePlusOneWeek = dateView;
    currentDatePlusOneWeek.setDate(currentDatePlusOneWeek.getDate() + 1 * 7);
    setDateView(currentDatePlusOneWeek);
    const newWeek = timeUtil(currentDatePlusOneWeek);
    setWeekNumber(newWeek);
    updateWeekPlan(newWeek);
  }

  return (
    <div className="flex-col w-full">
      <div className="flex flex-row">
        <div className="mx-2">Week number: {weekNumber} </div>
        <div className="my-auto"><Button image={<ArrowLeft />} handleClick={goToPreviousWeek} /></div>
        <div className="my-auto"><Button image={<ArrowRight />} handleClick={goToNextWeek} /></div>
      </div>

      <div className="flex flex-col md:flex-row">
        <PlanDay day="Monday" dish={weekPlan?.dish_monday} />
        <PlanDay day="Tuesday" dish={weekPlan?.dish_tuesday} />
        <PlanDay day="Wednesday" dish={weekPlan?.dish_wednesday} />
        <PlanDay day="Thursday" dish={weekPlan?.dish_thursday} />
        <PlanDay day="Friday" dish={weekPlan?.dish_friday} />
        <PlanDay day="Saturday" dish={weekPlan?.dish_saturday} />
        <PlanDay day="Sunday" dish={weekPlan?.dish_sunday} />
      </div>
    </div>
  )
}


