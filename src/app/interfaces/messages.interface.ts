export interface Message {
  text: string;
  isGtp: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  };
}
