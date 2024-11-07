import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { NextResponse } from "next/server";

const openai = new OpenAI();

const CalendarEvent = z.object({
  name: z.string(),
  date: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  duration: z.number(),
});

const Events = z.object({
  events: z.array(CalendarEvent),
});

export async function POST(req) {
  const jsonData = await req.json();
  const message = jsonData.message;
  const currentEvents = jsonData.currentEvents;

  console.log("POSTING");
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-2024-08-06",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant trying to schedule build a weekly routine for your client." +
          "You are going to help the client reach his goal by building events over a week long" +
          "ensure that the client reaches his goal" +
          "Extract the number of hours the client wants to work on his goal" +
          "Break up the number of hours into different session over a 1 week period." +
          "It is mandatory that the hours of each session add up the number of hours for the goal" +
          "Date should be in the form of days of the week (Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday)." +
          "Start_time and End_time should be in military time HH:MM:SS" +
          "Duration should be in terms of hours" +
          "Choose starting and ending times based on popular times to do each activity" +
          "Each Session should be spread out relatively evenly with slight preference to weekends" +
          "Each session should at minimum 30 minutes" +
          "Example: if given 10 hours, the sum of all durations should be 10. This is mandatory" +
          "",
      },
      {
        role: "user",
        content:
          message +
          "These are current events that I have scheduled" +
          "You cannot build events that overlap with my current schedule at ALL" +
          "Provide at 10 minute buffer time between each event" +
          "" +
          "" +
          currentEvents,
      },
    ],
    response_format: zodResponseFormat(Events, "events"),
  });

  const events = completion.choices[0].message.parsed;
  console.log(events);
  return NextResponse.json({ response: events }, { status: 200 });
}
