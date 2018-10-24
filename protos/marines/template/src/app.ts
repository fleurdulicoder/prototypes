import './assets/scss/index.scss'
export class App {
  constructor(private name: string) {
    this.name = name
  }

  public appName(): string {
    return this.name
  }
}

const root: App = new App('Marine Corps Template App')

console.log(`${root.appName()} gets started.`)
