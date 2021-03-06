/* eslint-disable */
import {Departments} from "./Departments";
import {Facilitator} from "./Facilitator";
import {Speaker} from "./Speaker";

export interface Invitation{
  event_id: number;
  event_uuid:string;
  event_title: string;
  event_description: string;
  event_start_date: string;
  event_end_date: string;
  seminar_hours: number;
  registration_link: string;
  departments: Departments[];
  speakers: Speaker[];
  facilitator: Facilitator;
}

