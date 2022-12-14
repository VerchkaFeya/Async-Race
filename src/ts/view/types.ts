import { Line } from "./garage/line";

export interface ICar {
	color: string,
	id?: number,
	name: string
}

export interface ICarWithId extends ICar {
	color: string,
	id: number,
	name: string
}


export type carsData = ICar[];
export type carsDataWithIds = ICarWithId[];


export interface engineData {
	distance: number,
	velocity: number
}


export type callbackType = () => void;
export type callbackEventType<Event> = (e: Event) => void;
export type callbackIdType = (id: Number) => void;
export type callbackStringType = (id: string) => void;

export interface IState {
	actualPage: number,
	totalAmount: number,
	carsPerPage: number,
	lastPageNumber?: number,
}

export interface IStateWinners {
	actualPage: number,
	totalAmount: number,
	winnersPerPage: number,
	lastPageNumber?: number,
}


export type buttonOrInputElem = HTMLButtonElement | HTMLInputElement;
export type buttonOrInputElemArray = buttonOrInputElem[];

export interface IGarageLine {
	id: number,
	line: Line
}

export interface IAnimationData {
	[key: string]: number
}

export interface IWinner {
	id?: number,
	wins: number,
	time: number
}

export interface IWinnerWithID {
	id: number,
	wins: number,
	time: number
}