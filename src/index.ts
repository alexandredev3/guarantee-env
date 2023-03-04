import "@abraham/reflection";
import { container } from './container';
import { CONTAINER_TYPES } from './constants/container-types';
import type { IProgram } from './program';

const program = container.get<IProgram>(CONTAINER_TYPES.PROGRAM);

program.run();