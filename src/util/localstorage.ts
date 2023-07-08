import { AudioLanguage } from "../state/audio-lang-context";
import { IGame } from "../models/IGame";
import { UserRoleEnum, UserStatusEnum } from "../models/IUser";

interface IAuthUser {
  id: string;
  username: string;
  phone: string;
  email: string;
  isEmailVerified: boolean;
  role: UserRoleEnum;
  status: UserStatusEnum;

  branchId: string | undefined;

  // cashierId or agentId
  cashierId: string | undefined;
  agentId: string | undefined;

  accessToken: string;
  isLoggedIn: boolean;
}

export const AUTH_USER_STORE_NAME = "bingo-auth-user";
export const ACTIVE_GAME_STORE_NAME = "active-game";
export const ACTIVE_GAME_SOLD_CARDS = "game-sold-cards";
export const ACTIVE_GAME_CALLED_NUMBERS = "called-numbers";
export const SOUND_PREFERENCE = "sound-preference";

/** stores authenticated user data to - localstorage */
export function storeAuthUser(authUser: IAuthUser) {
  window.localStorage.setItem(AUTH_USER_STORE_NAME, JSON.stringify(authUser));
}
/** returns authenticated user data from - localstorage */
export function getAuthUser(): IAuthUser {
  if (localStorage.getItem(AUTH_USER_STORE_NAME)) {
    return JSON.parse(
      localStorage.getItem(AUTH_USER_STORE_NAME) ?? ""
    ) as IAuthUser;
  }

  return {} as IAuthUser;
}

/** stores active game data to - localstorage */
export function storeActiveGame(activeGame: IGame) {
  window.localStorage.setItem(
    ACTIVE_GAME_STORE_NAME,
    JSON.stringify(activeGame)
  );
}

/** returns active game data from - localstorage */
export function getActiveGame(): IGame {
  if (localStorage.getItem(ACTIVE_GAME_STORE_NAME)) {
    return JSON.parse(
      localStorage.getItem(ACTIVE_GAME_STORE_NAME) ?? ""
    ) as IGame;
  }

  return {} as IGame;
}
export interface ISoldCards {
  money: number;
  cards: { id: string }[];
}

/** stores active game data to - localstorage */
export function storeSoldCards(soldCards: ISoldCards) {
  window.localStorage.setItem(
    ACTIVE_GAME_SOLD_CARDS,
    JSON.stringify(soldCards)
  );
}
/** returns active game data from - localstorage */
export function getStoredSoldCards(): ISoldCards {
  if (localStorage.getItem(ACTIVE_GAME_SOLD_CARDS)) {
    return JSON.parse(
      localStorage.getItem(ACTIVE_GAME_SOLD_CARDS) ?? ""
    ) as ISoldCards;
  }

  return {} as ISoldCards;
}

/** stores active game data to - localstorage */
export function storeCalledNumbers(calledNumbers: number[]) {
  window.localStorage.setItem(
    ACTIVE_GAME_CALLED_NUMBERS,
    JSON.stringify(calledNumbers)
  );
}
/** returns active game data from - localstorage */
export function getStoredCalledNumbers(): number[] {
  if (localStorage.getItem(ACTIVE_GAME_CALLED_NUMBERS)) {
    return JSON.parse(
      localStorage.getItem(ACTIVE_GAME_CALLED_NUMBERS) ?? ""
    ) as number[];
  }

  return {} as number[];
}

/** stores sound preference - localstorage */
export function storeSoundPreference(soundLang: AudioLanguage) {
  window.localStorage.setItem(SOUND_PREFERENCE, soundLang);
}
/** returns sound preference - localstorage */
export function getSoundPreference(): AudioLanguage {
  if (localStorage.getItem(SOUND_PREFERENCE)) {
    return (localStorage.getItem(SOUND_PREFERENCE) ??
      "English") as AudioLanguage;
  }

  return "English" as AudioLanguage;
}
