export class Player {
  name: string;
  is_spy: boolean;
  position: string;
  is_own_room: boolean;
  uniq_code: string;
  order: number;
  constructor() {
    this.uniq_code = '';
    this.name = '';
    this.is_spy = false;
    this.position = '';
    this.is_own_room = false;
  }
}
