import { StatusMessages } from '../enums';

type PromiseReturnStatus = StatusMessages | Error;

export default PromiseReturnStatus;
