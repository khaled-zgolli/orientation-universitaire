import { Paper } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import moment from 'moment'
import 'moment/locale/fr' 
import './agenda.scss'
import Button from '@material-ui/core/Button';
import PopupAddEvent from './PopupAddEvent';
import axios from "axios";
import Swal from "sweetalert2";
import { CopyToClipboard } from 'react-copy-to-clipboard'
import AgendaPopup from './AgendaPopup'




moment.locale("fr");


// ---- calendar wrapper
const Calendar = (props) => <div className="calendar">{props.children}</div>;

// ---- calendar header
const Header = (props) => <header className="header">{props.children}</header>;


// ---- column component for calendar header
const Column = (props) => <div className={props.align}>{props.children}</div>;

// ---- button component
const Btn = (props) => (
	<button type="button" title={props.text} aria-label={props.text} {...props}>
		{(props.icon) ? (<i className={props.icon}></i>) : props.text}
	</button>
);

// ---- week days
const WeekDays = (props) => {
	let m = moment().weekday();
	// map week names
	return (
		<ul className="weekdays">
			{moment.weekdays(true).map((item, i) => (
				<li key={i.toString()} className={m == i && "today"}>
					{item}
				</li>
			))}
		</ul>
	);
};

// ---- month events
const MonthEvents = (props) =>

	props.data &&
	props.data.map((c) => {
		const date = new Date ();
		

		
		 let colors = ["#31A5C4","#4A9537","#FCD40E"];
		let randColor = colors[Math.floor(Math.random() * colors.length)];
	
		let arr = c.date.split("-");
		if (arr[0] === props.year && arr[1] === props.month && arr[2] === props.day) {
	
	
		
			return (
			
				<div className={`ev ${(c.type) && 'label_'+c.type}`} style={{backgroundColor : randColor , color:"#fff"}} onClick={() => props.fn(c)}>
					<div className="ev-desc">
            <b>{c.content}</b><br/>
            <small style={{display:'block',textAlign:'right'}}>{c.hour}</small>
			{/* {user.Role ==="Conseiller" || user.Role ==="Admin" ?
			 <Button variant="outlined"  color="primary" 
			onClick={()=>{
				}} >
					<i class="fas fa-times-circle"></i>
				</Button> :""} */}
          </div>
				</div>
			);
		}
	});



const user = JSON.parse(localStorage.getItem('user'));

export default function Agenda (){

	const [data, setdata] = useState([{
	
		date:"",
		hour :"",
		content :"",
		type :"",
		source :"",
		name : user !== null  ?  user.Nom_prénom :""
		
	}]);

	useEffect(() => {
		const getAgenda = async () => {
		  await axios({
			url: 'http://localhost:4000/api/visio/getAgenda',
			method: 'get',
		
		  }).then((res)=>{
		   
			setdata(res.data)
		  })
		};
	  
		getAgenda();  
	  }, []); //UNE SEUL FOIS 

	
	  

	const [OpenPopupAdd, setOpenPopupAdd] = useState(false);
	const [OpenPopupAgenda, setOpenPopupAgenda] = useState(false);
	const [agendaData , setAgendaData]=useState({})
   // states

   // ---- month days
const MonthDays = (props) => {
	// first day
	const first = moment(props.date).date(1),
		// week format
		weekF = moment().format("YYYYMM");

	// get event data
	const handleClick = useCallback((event) => {
		setOpenPopupAgenda(true)
		setAgendaData(event)

	});

	// init arr
	let arr = [];

	// create 7 x 5 boxes
	for (let i = 0; i < 35; i++) {
		// day
		let day = moment()
				.date(1)
				.subtract(first.weekday() - i, "days"),
			// day format
			dayF = moment(day.format("YYYYMM")),
			// add class by type
			cls = dayF.isBefore(weekF)
				? "days-before"
				: dayF.isAfter(weekF)
				? "days-after"
				: props.date.clone().isSame(day, "day") && "today";
		// push
		arr.push(
			<li key={i.toString()} className={cls}>
				<div className="date">{day.date()}</div>
				<div className="info">{day.format("dddd")}</div>

				<MonthEvents
					data={props.data}
					day={day.clone().format("DD")}
					month={props.date.clone().format("MM")}
					year={props.date.clone().format("YYYY")}
					fn={handleClick}
				/>
			</li>
		);
	}
	return <ul className="days">{arr}</ul>;
};
	
	const [month, setMonth] = useState(moment());
  
	// next prev and today buttons
	const next = useCallback(() => {
		setMonth(month.clone().add(1, "month"));
	}, [month]);
  
	const prev = useCallback(() => {
		setMonth(month.clone().subtract(1, "month"));
	}, [month]);
  
	const today = useCallback(() => {
		setMonth(moment());
	}, [month]);
  
	// render
	return (
        <Paper style={{margin : "1% 5%"}} elevation={12}>
		<Calendar>
			<Header>
				<Column align="left">
					<Btn 
						onClick={prev} 
						icon="fa fa-arrow-left" 
						text={"Anterior"} />
					<Btn 
						onClick={today} 
						icon="fa fa-calendar" 
						text={"Hoy"} />
					<Btn 
						onClick={next} 
						icon="fa fa-arrow-right" 
						text={"Siguiente"} />
				</Column>
				<Column align="center">
					<h1>{month.format("MMMM")}</h1>
				</Column>

				 { user !== null ? user.Role ==="Conseiller" || user.Role ==="Admin" ? <Button variant="outlined"  color="primary" onClick={()=>{
					setOpenPopupAdd(true);
				}} >
				 Ajouter event
				</Button> :"":""}
			
				
			
			</Header>
			<WeekDays />
			<MonthDays date={month} data={data} />
		</Calendar>


		<PopupAddEvent
        OpenPopupAdd={OpenPopupAdd}
        setOpenPopupAdd={setOpenPopupAdd}
    
      ></PopupAddEvent>

		<AgendaPopup
        OpenPopupAgenda={OpenPopupAgenda}
        setOpenPopupAgenda={setOpenPopupAgenda}
		data={agendaData}
      ></AgendaPopup>

        </Paper>
	);
}