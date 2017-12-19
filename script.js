class Stopwatch extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			running: false,
			minutes: 0,
			seconds: 0,
			miliseconds: 0
		}
	}

	reset() {
		this.setState({
			minutes: 0,
			seconds: 0,
			miliseconds: 0
		})
	}

	format(times) {
		let minutes = pad0(times.minutes)
		let seconds = pad0(times.seconds)
		let miliseconds = Math.floor(pad0(times.miliseconds))
		return `${minutes}:${seconds}:${miliseconds}`
	}

	start() {
		if (!this.state.running) {
			this.setState({
				running: true,
				watch: setInterval(() => this.step(), 10)
			})
		}
	}
	step() {
		if (!this.state.running) return
		this.calculate()
	}

	calculate() {
		let miliseconds = this.state.miliseconds
		let seconds = this.state.seconds
		let minutes = this.state.minutes

		miliseconds += 1
		if (miliseconds >= 100) {
			seconds += 1
			miliseconds = 0
		}
		if (seconds >= 60) {
			minutes += 1
			seconds = 0
		}

		this.setState({
			minutes: minutes,
			seconds: seconds,
			miliseconds: miliseconds
		})
	}

	stop() {
		this.setState({
			running: false
		})
		clearInterval(this.state.watch)
	}
	render() {
		return (
			<div>
				<div>{this.format(this.state)}</div>
				<button href="#" className="button" id="start" onClick={this.start.bind(this)}>
			 		Start 
			 	</button>
    			<button href="#" className="button" id="stop" onClick={this.stop.bind(this)}>
    				Stop 
				</button>
    			<button href="#" className="button" id="stop" onClick={this.reset.bind(this)}>
    				Reset 
    			</button>
			</div>
		)
	}

}

function pad0(value) {
	let result = value.toString();
	if (result.length < 2) {
		result = '0' + result;
	}
	return result;
}

ReactDOM.render(<Stopwatch/>, document.getElementById('stopwatch'));