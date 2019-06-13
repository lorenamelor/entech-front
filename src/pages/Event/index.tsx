import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IRootState } from '../../store';
import { Redirect } from 'react-router';
import theme from '../../utils/theme';
import map from 'lodash/map';
import { CircularProgress } from '@material-ui/core';

import AliceCarousel from 'react-alice-carousel';
import { TabBar, Text, CardPhoto } from '../../components';
import { CalendarToday, AccessTime, TouchApp } from '@material-ui/icons';
import { eventRequestById, selectEvent, selectIsRequestEvent } from '../../store/event';

interface IProps {
	match: any;
}
class Event extends React.PureComponent<IMapDispatchToProps & IMapStateToProps & IProps> {

	public componentDidMount() {
		const { match: { params: { eventId } } } = this.props;
		this.props.eventRequestById(eventId);
	}

	public render() {
		const { event, isRequestEvent } = this.props;
		const { title, startTime, endTime, date, techshots, address, city } = event;

		const responsive = {
			0: { items: 1 },
			500: { items: 2 },
			750: { items: 3 },
			960: { items: 4 },
			1300: { items: 5 },
			1600: { items: 6 },
			1900: { items: 7 },
			2400: { items: 8 },
		}

		if (!sessionStorage.getItem('userData')) { return <Redirect to="/" /> }
		if(isRequestEvent || event === {}) { return <Spinner size={50}/> }
		return (
			<>
				<TabBar />
				<Wrapper>
					<Top>
						<Image src="https://picsum.photos/800/400?random=2" />
						<InfoContainer>
							<Text bold size={24}>
								{title}
							</Text>
							<Info>
								<CalendarToday style={{ color: theme.colors.gray60 }} />
								<Text bold> Data do Evento: </Text>
								 <Text> {date}</Text>
							</Info>
							<Info>
								<AccessTime style={{ color: theme.colors.gray60 }} />
								<Text bold> Horário do Evento: </Text>
								<Text> {`${startTime} às ${endTime}`}</Text>
							</Info>
							<Info>
								<TouchApp style={{ color: theme.colors.gray60 }} />
								<Text bold> Local: </Text>
								<Text> {`${address}, ${city}`} </Text>
							</Info>

							{/* <ButtonCotainer>
								<ButtomAction onClick={() => console.log('onclick')}>
									Confirmar presença
							</ButtomAction>
							</ButtonCotainer> */}
						</InfoContainer>
					</Top>

					<Text bold size={24}>
						Oque te espera?
					</Text>

					<AliceCarousel
						mouseDragEnabled
						responsive={responsive}
						stagePadding={{
							paddingLeft: 10,
							paddingRight: 10,
						}}

						buttonsDisabled={true}
					>
						{map(techshots, techshot => <CardPhoto item={techshot} type='techshot' />)	}
					</AliceCarousel>


					{/* <Container>
						<Coments />
						<AttendanceList />
					</Container> */}
				</Wrapper>
			</>
		);
	}
}

// MAP TO PROPS
interface IMapStateToProps {
	event: any;
	isRequestEvent: boolean;
};

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
	event: selectEvent(state),
	isRequestEvent: selectIsRequestEvent(state)
});

interface IMapDispatchToProps {
	eventRequestById: (eventId: string) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
	eventRequestById: (eventId: string) => dispatch(eventRequestById.started({ eventId })),
})

// STYLE
const Wrapper = styled.div`
  margin: 20px;
`;

const Top = styled.div`
	display: flex;
	margin-bottom: 20px;

	@media (max-width: 750px){
		flex-wrap: wrap
  }
`;

const Image = styled.img`
	width: 50%;
	height: 270px;
	margin-right: 30px;
	border-radius: 20px;

	@media (max-width: 750px){
		width: 100%;
		margin-right: 0px;
  }
`;

const InfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 20px 0px 30px;
	flex-wrap: wrap;
	@media (max-width: 750px){
		width: 100%;
  }
`;

const Info = styled.div`
  display: flex;
	margin: 14px 30px 0px 0px;
`;

const Spinner = styled(CircularProgress)`
&&{
	color: ${props => props.theme.colors.primary};;
}
` as typeof CircularProgress;


// const ButtonCotainer = styled.div`
// 	display: flex;
// 	width: 100%;
// 	justify-content: center;
// `;

// const ButtomAction: any = styled(Button)<{buttonComent: boolean}>`
// &&{
// 	background-color: ${props => props.theme.colors.primary};
// 	color: ${props => props.theme.colors.white};
// 	text-transform: none;
// 	font-size: 15px;
// 	margin: 20px;
// 	height: 31px;
// 	width: 100%;
// 	min-width: 25px;
// 	border-radius: 35px;
//   align-items: center;
//   padding: 0px 10px;
// }
// `;

// const Container = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;

export default connect(mapStateToProps, mapDispatchToProps)(Event);