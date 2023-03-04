import { Container, decorate, injectable, unmanaged } from 'inversify';
import { Command } from 'commander';

import { CONTAINER_TYPES } from './constants';

import { Load } from './load';
import { Fs } from './fs';
import { Explorer } from './explorer';
import { Program } from './program';

import type { ILoad } from './load';
import type { IFs } from './fs';
import type { IExplorer } from './explorer';
import type { IProgram } from './program';

decorate(injectable(), Command);
decorate(unmanaged(), Command, 0);

const container = new Container({ skipBaseClassChecks: true });

container.bind<IFs>(CONTAINER_TYPES.FS).to(Fs);
container.bind<IExplorer>(CONTAINER_TYPES.EXPLORER).to(Explorer);
container.bind<ILoad>(CONTAINER_TYPES.LOAD).to(Load);
container.bind<Command>(CONTAINER_TYPES.COMMAND).to(Command);
container.bind<IProgram>(CONTAINER_TYPES.PROGRAM).to(Program);

export { container };
