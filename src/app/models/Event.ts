/* eslint-disable */
import {Departments} from "./Departments";
import {Speaker} from "./Speaker";

export interface EventsToAdd{
  event_id: number;
  event_uuid:string;
  event_title: string;
  event_description: string;
  event_start_date: string;
  event_end_date: string;
  seminar_hours: number;
  timezone_id: string;
  registration_link: string;
  departments: Departments[];
  speakers: Speaker[];
}
