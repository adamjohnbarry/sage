import { createContext } from 'react';
import { langEN } from '../utils/utils';

const safeArea = { paddingTop: 0, paddingBottom: 0 };

const SafeAreaContext = createContext(safeArea);
const LangContext = createContext(langEN);

export { SafeAreaContext, LangContext };
