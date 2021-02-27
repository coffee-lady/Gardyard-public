import { DBType } from 'src/app/interfaces/common';

export interface Question extends DBType {
    question: string;
    answer: string;
}
