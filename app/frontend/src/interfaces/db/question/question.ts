import { DBType } from 'app/frontend/src/interfaces/common';

export interface Question extends DBType {
    question: string;
    answer: string;
}
