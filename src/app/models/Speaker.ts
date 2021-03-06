/* eslint-disable */
export class Speaker{
  speaker_id: number;
  speaker_name: string;
  speaker_email: string;
  speaker_description: string;
  speaker_chosen: boolean;

  constructor() {
    this.speaker_id = 0;
    this.speaker_name = '';
    this.speaker_email = '';
    this.speaker_description = '';
    this.speaker_chosen=false;
  }

  set SpeakerID(value: number) {
    this.speaker_id = value;
  }

  set SpeakerName(value: string) {
    this.speaker_name = value;
  }

  set SpeakerEmail(value: string) {
    this.speaker_email = value;
  }

  set SpeakerDescription(value: string) {
    this.speaker_description = value;
  }

  get SpeakerID(): number {
    return this.speaker_id;
  }

  get SpeakerName(): string {
    return this.speaker_name;
  }

  get SpeakerEmail(): string {
    return this.speaker_email;
  }

  get SpeakerDescription(): string {
    return this.speaker_description;
  }
}
