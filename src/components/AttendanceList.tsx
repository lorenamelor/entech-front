import * as React from 'react';
import styled from 'styled-components';
import { Paper, Avatar } from '@material-ui/core';
import { Text } from '../components';
import { Dispatch } from 'redux';
import { surveyDelete } from '../store/survey';
import { connect } from 'react-redux';

// interface IProps {
//   survey: iSurvey,
// }
class AttendaceList extends React.PureComponent<IMapDispatchToProps> {

  public state = {
    openModalEdit: false,
    openModalDelete: false,
  };

  public handleModalDelete = () => {
    this.setState({ openModalDelete: !this.state.openModalDelete });
  }

  public handleSurveyDelete = (surveyId: string) => () => {
    this.props.surveyDelete(surveyId);
    this.handleModalDelete();
  }

  public render() {
    // const { _id } = this.props.survey;
    return (
      <div style={{width: '28%'}}>
        <Text bold size={24}>
          Confirmaram presença
							</Text>
        <CardWrapper>
          <PersonConfirm>
            <Photo alt="Remy Sharp" src="https://picsum.photos/800/400?random=1" />
            <Text bold wight size={15}>
              Lorena Carla
          </Text>
          </PersonConfirm>

          <PersonConfirm>
            <Photo alt="Remy Sharp" src="https://picsum.photos/800/400?random=1" />
            <Text bold wight size={15}>
              Lorena Carla
          </Text>
          </PersonConfirm>

          <PersonConfirm>
            <Photo alt="Remy Sharp" src="https://picsum.photos/800/400?random=1" />
            <Text bold wight size={15}>
              Lorena Carla
          </Text>
          </PersonConfirm>

        </CardWrapper>
      </div>
    );
  }
}

// MAP TO PROPS
interface IMapDispatchToProps {
  surveyDelete: (surveyId: string) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
  surveyDelete: (surveyId: string) => dispatch(surveyDelete.started({ surveyId })),
})


// STYLE
const CardWrapper = styled(Paper)`
&&{
  margin: 10px 0px;
  display: flex;
  background-color: ${props => props.theme.colors.white};
  flex-direction: column;
  padding: 10px;
  border-radius: 5px;
}
` as typeof Paper;

const PersonConfirm = styled.div`
        display: flex;
        flex-direction: row;
        width: 100%;
        margin: 5px;
      `;

const Photo: any = styled(Avatar)`
&&{
  margin-right: 20px;
  height: 30px;
  width: 30px;
}
` as typeof Avatar;

export default connect(null, mapDispatchToProps)(AttendaceList);