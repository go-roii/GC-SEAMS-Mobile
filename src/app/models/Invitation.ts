/* eslint-disable */
import {Departments} from "./Departments";
import {Facilitator} from "./Facilitator";

export interface Invitation{
  event_id: number;
  event_uuid:string;
  event_title: string;
  event_description: string;
  event_start_date: string;
  event_end_date: string;
  registration_link: string;
  departments: Departments[];
  facilitator: Facilitator;
}

