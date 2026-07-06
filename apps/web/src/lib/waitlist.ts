/** First signup is shown as #350, then #351, #352, … */
export const WAITLIST_POSITION_START = 350;

export function toWaitlistDisplayPosition(signupOrder: number): number {
  return WAITLIST_POSITION_START + signupOrder - 1;
}
