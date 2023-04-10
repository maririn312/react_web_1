import React from "react";
import "./TimeAgo.css";

class TimeAgo extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            timeText: '',
            tsag: this.props.date || new Date()
        };
    }

    componentDidMount() {
        const newTime =this.changeTsag(this.state.tsag);
        this.setState({ timeText: newTime });
    }

    changeTsag = (time) => {
        var givenTime =Math.floor(Date.parse(time)/1000.0),
             // (2020-01-27T14:22:07.000Z) ISO time format to Unix Epoch
            //givenTime = Math.floor(timeStamp.getTime()/1000.0), (2020-01-27 14:22:07)
            now =Math.floor((new Date().getTime()/1000.0)+28800),
            result =this.calculateTime(givenTime, now);
            return result;
    }

    getPlanetDate = () => {
        // var day ='';
        switch (new Date().getDay()) {
            case 0:
                return "Ням гариг";
            case 1:
                return "Даваа гариг";
            case 2:
                return "Мягмар гариг";
            case 3:
                return "Лхагва гариг";
            case 4:
                return "Пүрэв гариг";
            case 5:
                return "Баасан гариг";
            case 6:
                return "Бямба гариг";
            default:
                return '';
        }
    }

    calculateTime = (givenTime, now) => {
        var just = now - givenTime;
        var utcDate = new Date(givenTime*1000),
            year = utcDate.getFullYear(),
            month = utcDate.getMonth()+1,
            date = utcDate.getUTCDate(),
            hours = utcDate.getUTCHours(),
            minutes = utcDate.getUTCMinutes();
            // seconds =utcDate.getUTCSeconds();

        var rightNow =new Date(),
            // y =rightNow.getFullYear(),
            m =rightNow.getMonth()+1,
            d =rightNow.getDate(),
            h =rightNow.getHours(),
            // min =rightNow.getMinutes(),
            // sec =rightNow.getSeconds(),
            plusState ='',
            result='',
            hour;

        if(this.props.type ==='nowTime') {
            var planetDay =this.getPlanetDate(),
                monthTwoDigit =m < 10 ? '0' + m : '' + m;
            return monthTwoDigit+' сарын ' + d +' '+planetDay;
            // return result;
        }
        else if(this.props.type ==='newsMore') {
            if(just < 60) plusState ='өмнө';
            else if(just < 3600) plusState = (m-minutes)+' минутын өмнө';
            else if(just < 86400) plusState =(h-hours)+' цагийн өмнө';
            else if(just < 7* 86400) plusState =(h-hours)+' цагийн өмнө';

            if(just < 60) result ='Дөнгөж сая';
            else if(just < 3600) result = Math.floor(just / 60)+' минутын өмнө '+ plusState;
            else if(just < 86400) {
                hour = Math.floor(just/3600);
                result =(hour > utcDate.getHours()) ? 'Өчигдөр' : plusState;
            }
            else if(just < 7* 86400) { //Limit 7 өдөр
                result =(d-date)+' өдөр '+plusState;
            }
            else result =year +'/'+ month +'/'+ date +' '+ hours +':'+ minutes;

            return result;
        }
        else {
            if(just < 60) result ='Дөнгөж сая';
            else if(just < 3600)  {
                result = Math.floor(just / 60)+' минутын өмнө '+ plusState;
            }
            else if(just < 86400) {
                hour = Math.floor(just/3600);
                result =(hour > utcDate.getHours()) ? 'Өчигдөр' : hour+' цагийн өмнө '+ plusState;
            }
            else if(just < 7* 86400) { //Limit 7 өдөр
                result =(d-date)+' өдөр '+plusState;
            }
            else result =year +'/'+ month +'/'+ date +' '+ hours +':'+ minutes;

            return result;
        }
    }

    render() {
        const style = {
            fontSize: '15px',
            fontStyle: "italic",
            color: this.props.color || '#666'
        }

        if(this.props.type ==='nowTime')  {
            Object.assign(style, {
                color: '#646464',
                fontSize: '14px',
                margin: '8px 0px 0px 0px'
            });
        }
        else if(this.props.type ==='newsMore')  {
            Object.assign(style, {fontSize: '18px'});
        }

        return (
            <div className="timeAgo" style={style}>
                { this.state.timeText }
            </div>
        );

        // if(this.props.type ==='headerTime')  {
        //     return (
        //         <div className="timeHeader">
        //             { this.state.timeText }
        //         </div>
        //     );
        // } else {
        //     return (
        //         <div className="timeAgo" style={style}>
        //             { this.state.timeText }
        //         </div>
        //     );
        // }
    }
}

export { TimeAgo };
