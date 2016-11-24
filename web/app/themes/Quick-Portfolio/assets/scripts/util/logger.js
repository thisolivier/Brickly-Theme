// Just a logging script which makes things readable,
// tracks the number of entries its making,
// and the time my script is taking to run.
export default class Logger {
  static log(printMe) {
    this.index = !this.index ? 1 : this.index += 1;
    // const pad = number => (number <= 99 ? (`000${number}`).slice(-2) : number);
    const indexAPI = this.index;
    const nowTime = new Date();
    const prefix = `## Captain's log, stardate ${indexAPI}.${nowTime.getMilliseconds()} ->`;
    if (printMe === 'begin') {
      Logger.print(prefix, 'Our destination is the great, unexplored mass of the galaxy (o__o)');
    } else if (printMe) {
      Logger.print(prefix, printMe);
    } else {
      Logger.print(prefix, 'Space is vast and empty (-__-)');
    }
  }
  // This is iscolated incase I later change the formatting, or use a logging plugin
  static print(prefix, printMe) {
    console.log(`${prefix} ${printMe}`);
  }
}
