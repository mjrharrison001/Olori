export class Server {
  numberOfUsers: number;
  numberOfKeys: number;
  numberOfActiveUsers: number;
  updateTimer: number;
  lastSuccessfulUpdate: string;

  constructor(numberOfUsers: number, numberOfKeys: number,
              numberOfActiveUsers: number, updateTimer: number,
              lastSuccessfulUpdate: string){
    this.numberOfUsers    = numberOfUsers;
    this.numberOfKeys   = numberOfKeys;
    this.numberOfActiveUsers  = numberOfActiveUsers;
    this.updateTimer     = updateTimer;
    this.lastSuccessfulUpdate     = lastSuccessfulUpdate;
  }
}
