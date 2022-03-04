import "./App.css";
import { useState, useEffect, useCallback } from "react";
import Facebook from "./images/icon-facebook.svg";
import Instagram from "./images/icon-instagram.svg";
import Pintrest from "./images/icon-pinterest.svg";

function App() {
	const [day, setDay] = useState("");
	const [hours, setHours] = useState("");
	const [minutes, setMinutes] = useState("");
	const [seconds, setSeconds] = useState("");
	const [finish, setFinish] = useState("");
	const [time, setTime] = useState("");
	const [show, setShow] = useState(false);

	let futureDate = new Date(2022, 2, 12, 10, 59, 45);
	let futurTime = futureDate.getTime();

	const getRemainingTime = useCallback(() => {
		const today = new Date().getTime();
		const realTime = futurTime - today;
		let oneDay = 24 * 60 * 60 * 1000;
		let oneHour = 60 * 60 * 1000;
		let oneMinute = 60 * 1000;

		let days = Math.floor(realTime / oneDay);
		let hours = Math.floor((realTime % oneDay) / oneHour);
		let minutes = Math.floor((realTime % oneHour) / oneMinute);
		let seconds = Math.floor((realTime % oneMinute) / 1000);

		function format(item) {
			if (item < 10) {
				return (item = `0${item}`);
			}
			return item;
		}
		// set values array

		const values = [days, hours, minutes, seconds];
		setDay(format(values[0]));
		setHours(format(values[1]));
		setMinutes(format(values[2]));
		setSeconds(format(values[3]));
		setTime(realTime);
	}, [futurTime]);

	let countDown = setInterval(getRemainingTime, 1000);
	if (time < 0) {
		clearInterval(countDown);
		setShow(true);
		setFinish("Sorry this giveaway has expired");
	}

	useEffect(() => {
		getRemainingTime();
	}, [getRemainingTime]);

	return (
		<div className='App'>
			<div className='top'>
				<div className='content'>
					{show ? (
						<h1>{finish}</h1>
					) : (
						<>
							<h1>WE ARE LAUNCHING SOON</h1>
							<div className='time'>
								<div className='days'>
									<h1>{day}</h1>
									<p>DAYS</p>
								</div>
								<div className='hours'>
									<h1>{hours}</h1>
									<p>HOURS</p>
								</div>
								<div className='minutes'>
									<h1>{minutes}</h1>
									<p>MINUTES</p>
								</div>
								<div className='seconds'>
									<h1>{seconds}</h1>
									<p>SECONDS</p>
								</div>
							</div>
						</>
					)}
				</div>
			</div>

			<div className='bottom'>
				<div className='images'>
					<img src={Facebook} alt='' />
					<img src={Instagram} alt='' />
					<img src={Pintrest} alt='' />
				</div>
			</div>
		</div>
	);
}

export default App;
