"use client";

import React, { useState, useCallback } from "react";
import Scheduler, { SchedulerData, ViewTypes } from "react-big-scheduler";
import withDragDropContext from "./withDragDropContext";
import "react-big-scheduler/lib/css/style.css";
import DemoData from "./DemoData";
import "./style.css";
import DateNavigator from "./DateNavigator";
import ViewChanger from "./ViewChanger";
import IntervalChanger from "./IntervalChanger";
import CustomDropdown from "../CustomDropdown";
import StarIcon from "@/assets/svgs/StarIcon";
import AssignCard from "./AssignCard";

const Basic = () => {
  const tabOptions = [
    { id: 1, label: "Assigned" },
    { id: 2, label: "Unassigned" },
  ];

  const statusOptions = [
    { value: 1, label: "Value 1" },
    { value: 2, label: "Value 2" },
    { value: 3, label: "Value 3" },
  ];

  const [selectedValue, setSelectedValue] = useState(1);
  const [selectedTab, setSelectedTab] = useState(1);

  const initialSchedulerData = new SchedulerData(
    "2017-12-18",
    ViewTypes.Week,
    false,
    false
  );
  initialSchedulerData.setResources(DemoData.resources);
  initialSchedulerData.setEvents(DemoData.events);

  const [schedulerData, setSchedulerData] = useState(initialSchedulerData);

  schedulerData.config.resourceName = "Team";

  const updateScheduler = useCallback((updatedData) => {
    setSchedulerData(
      Object.assign(
        Object.create(Object.getPrototypeOf(updatedData)),
        updatedData
      )
    );
  }, []);

  const prevClick = () => {
    schedulerData.prev();
    schedulerData.setEvents(DemoData.events);
    updateScheduler(schedulerData);
  };

  const nextClick = () => {
    schedulerData.next();
    schedulerData.setEvents(DemoData.events);
    updateScheduler(schedulerData);
  };

  const goToToday = () => {
    schedulerData.setDate(new Date().toISOString().split("T")[0]);
    schedulerData.setEvents(DemoData.events);
    updateScheduler(schedulerData);
  };

  const handleIntervalChange = (interval) => {
    schedulerData.config.minuteStep = interval;
    schedulerData.setEvents(DemoData.events);
    updateScheduler(schedulerData);
  };

  const onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(
      view.viewType,
      view.showAgenda,
      view.isEventPerspective
    );
    schedulerData.setEvents(DemoData.events);
    updateScheduler(schedulerData);
  };

  const onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(DemoData.events);
    updateScheduler(schedulerData);
  };

  const eventClicked = (schedulerData, event) => {
    alert(
      `You just clicked an event: {id: ${event.id}, title: ${event.title}}`
    );
  };

  const slotItemTemplateResolver = (schedulerData, slot) => {
    const resource = schedulerData.resources.find(
      (res) => res.id === slot.slotId
    );

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0px 10px",
          gap: "5px",
        }}
      >
        <div
          style={{
            display: "inline-block",
            width: "10px",
            height: "10px",
            background: resource?.bgColor || "red",
            borderRadius: "50px",
          }}
        ></div>
        <span>{slot.slotName || "No Name"}</span>
      </div>
    );
  };

  const eventItemTemplateResolver = (schedulerData, event) => {
    const formatTime = (date) => {
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      return new Date(date).toLocaleString("en-US", options);
    };

    return (
      <div
        style={{
          padding: "6px",
          backgroundColor: event.bgColor || "#3174ad",
          color: "#232529",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          borderLeft: "4px solid",
          borderColor: event.borderColor,
        }}
      >
        <span style={{ fontSize: "12px", fontWeight: 500 }}>{event.title}</span>
        <span style={{ fontSize: "12px", fontWeight: 400 }}>
          {formatTime(event.start)} - {formatTime(event.end)}
        </span>
      </div>
    );
  };

  const handleViewChange = (viewType) => {
    schedulerData.setViewType(viewType, false, false);
    schedulerData.setEvents(DemoData.events);
    updateScheduler(schedulerData);
  };

  return (
    <div className="scheduler_container">
      <div className="grid grid-cols-3">
        <div className="col-span-2 border-r-2 border-[#EEEFF1]">
          <div className="flex justify-between items-center py-2.5 mx-5">
            <div className="flex gap-4">
              <CustomDropdown
                label="Status"
                options={statusOptions}
                selectedValue={selectedValue}
                onChange={setSelectedValue}
              />

              <CustomDropdown
                label="Team"
                options={statusOptions}
                selectedValue={selectedValue}
                onChange={setSelectedValue}
              />
            </div>

            <div className="flex gap-4">
              <IntervalChanger onChangeInterval={handleIntervalChange} />
              <ViewChanger onChangeView={handleViewChange} />
              <DateNavigator
                onPrev={prevClick}
                onNext={nextClick}
                onToday={goToToday}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center py-2.5 px-5 border-b-2 border-[#EEEFF1]">
          {tabOptions.map((tab) => (
            <button
              key={tab.id}
              className={`py-0.5 px-4 h-fit text-base border-2 rounded-lg ${
                selectedTab === tab.id
                  ? "bg-[#FAFAFA] border-[#EEEFF1]"
                  : "text-[#667085] border-transparent"
              }`}
              onClick={() => setSelectedTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3">
        <div className="col-span-2 border-r-2 border-[#EEEFF1]">
          <Scheduler
            schedulerData={schedulerData}
            prevClick={prevClick}
            nextClick={nextClick}
            onSelectDate={onSelectDate}
            onViewChange={onViewChange}
            eventItemClick={eventClicked}
            newEvent={(schedulerData, slotId, slotName, start, end) => {
              let newFreshId =
                schedulerData.events.reduce(
                  (maxId, item) => Math.max(maxId, item.id),
                  0
                ) + 1;

              let newEvent = {
                id: newFreshId,
                title: "New event",
                start: start,
                end: end,
                resourceId: slotId,
                bgColor: "purple",
              };

              schedulerData.addEvent(newEvent);
              updateScheduler(schedulerData);
            }}
            slotItemTemplateResolver={slotItemTemplateResolver}
            eventItemTemplateResolver={eventItemTemplateResolver}
          />
        </div>

        <div className="flex flex-col py-3 mx-5">
          <div
            className={`flex items-center gap-2 justify-center py-1 px-4 border-2 rounded-lg bg-[#FAFAFA] border-[#EEEFF1] `}
          >
            <span>Assign All</span>
            <StarIcon />
          </div>

          <div className="flex flex-col">
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <AssignCard key={index} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withDragDropContext(Basic);
