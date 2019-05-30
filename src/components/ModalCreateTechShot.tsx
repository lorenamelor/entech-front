import * as React from 'react';
import { Dispatch } from 'redux';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import styled from 'styled-components';

import { Modal, TextField, Button } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input'

// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Text } from '../components';

import { iSurvey } from '../utils/interfaces';
import { surveyCreate, surveyEdit, selectSurvey, surveyRequestById } from '../store/survey';
import { connect } from 'react-redux';
import { IRootState } from '../store';

interface IProps {
  open: boolean;
  handleClose: () => void;
  techshotId?: string;
  techshot?: any;
}

const validationForm = Yup.object().shape({
  title: Yup.string().required("Campo obrigatório"),
  duration: Yup.string().required("Campo obrigatório"),
  description: Yup.string().required("Campo obrigatório"),
  photoURL: Yup.string(),
  keywords: Yup.array(),
});

const initialValues = {
  title: '',
  duration: '',
  description: '',
  photoURL: '',
  keywords: [],
}

class ModalCreateSurvey extends React.PureComponent<IProps & IMapDispatchToProps & IMapStateToProps> {

  public componentDidMount() {
    // const { techshotId } = this.props;

    // if(techshotId){
    //   this.props.surveyRequestById(techshotId);
    // }

    
  }

  public render() {
    const { open, handleClose, techshot, techshotId } = this.props;
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <Body>
            <Text size={22}>Cadastrar TechShot</Text>

            <Formik
              initialValues={techshotId && techshot._id === techshotId ? techshot : initialValues}
              enableReinitialize
              validationSchema={validationForm}
              onSubmit={values => {


                const payload = {
                  ...values,
                  userId: "5ce030c9d323f326247f3122"
                }

                techshotId
                  ? this.props.surveyEdit(payload, techshotId)
                  : this.props.surveyCreate(payload);
                handleClose();
              }}
            >
              {({ errors, touched, values: {
                title,
                duration,
                description,
                photoURL,
                keywords,
              },
                handleChange, setFieldTouched, setFieldValue }) => {

                const change = (nameInput: any, e: any) => {
                  if (nameInput === 'keywords'){
                    console.log(e)
                    const value = [...keywords, e];
                    setFieldValue(name, value)
                  }else {
                    e.persist();
                    handleChange(e);
                  }
                  setFieldTouched(nameInput, true, false);
                };

                return (
                  <Form>
                    <Input
                      label="Titulo"
                      name='title'
                      value={title}
                      helperText={touched.title ? errors.title : ""}
                      error={touched.title && Boolean(errors.title)}
                      onChange={change.bind(null, "title")}
                      width="99%"
                    />

                    <Input
                      label="Descrição"
                      name='description'
                      value={description}
                      helperText={touched.description ? errors.description : ""}
                      error={touched.description && Boolean(errors.description)}
                      onChange={change.bind(null, "description")}
                      width="99%"
                      multiline
                      rowsMax="4"
                    />

                    <Input
                      label="Duração"
                      name="duration"
                      type="number"
                      value={duration}
                      helperText={touched.duration ? errors.duration : ""}
                      error={touched.duration && Boolean(errors.duration)}
                      onChange={change.bind(null, "duration")}
                      width="30%"
                    />

                    <ChipInput
                      defaultValue={keywords}
                      // name='keywords'
                      label='Palavras Chaves'
                      onAdd={change.bind(null, "keywords")}
                      // onDelete={(chip, index) => handleDeleteChip(chip, index)}
                      value={keywords}
                    />

                    {/* <input
                      accept="image/*"
                      id="button-file"
                      multiple
                      type="file"
                      style={{ display: 'none' }}
                      name="photoURL"
                      value={photoURL}
                      onChange={change.bind(null, "photoURL")}
                    />
                    <label htmlFor="button-file">
                      <BtnUpload variant="contained" component="span">
                        <CloudUploadIcon style={{ marginRight: 3 }} />
                        Foto
                    </BtnUpload>
                    </label> */}

                    <Btn type="submit">Salvar</Btn>
                    {/* <Btn onClick={}>Salvar</Btn> */}
                  </Form>
                )
              }}
            </Formik>

          </Body>
        </Modal>
      </div >
    );
  }
}


// MAP TO PROPS

interface IMapStateToProps {
  survey: iSurvey;
};

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  survey: selectSurvey(state),
});

interface IMapDispatchToProps {
  surveyCreate: (payload: iSurvey) => void;
  surveyEdit: (payload: iSurvey, techshotId: string) => void;
  surveyRequestById: (techshotId: string) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
  surveyCreate: (payload: iSurvey) => dispatch(surveyCreate.started(payload)),
  surveyEdit: (payload: iSurvey, techshotId: string) => dispatch(surveyEdit.started({ payload, techshotId })),
  surveyRequestById: (techshotId: string) => dispatch(surveyRequestById.started({ techshotId })),
})


// STYLE
const Body = styled.div`
	  background-color: ${props => props.theme.colors.white};
    position: absolute;
    width: 400px;
    box-shadow: 5px 10px 10px #888888;
    border-radius: 5px;
    padding: 20px;
    outline: 'none';
    top: 46%;
    left: 50%;
    transform: translate(-46%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Input: any = styled(TextField) <{ width: string }>`
&&{
  margin: 5px;
  width: ${props => props.width};
}
` as typeof TextField;

const Btn = styled(Button)`
&&{
  margin-top: 20px;
  width: 100%;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white}
}
` as typeof Button;

// const BtnUpload: any = styled(Button)`
// &&{
//   margin-top: 15px;
//   width: 20%;
//   color: ${props => props.theme.colors.gray60}
// }
// ` as typeof Button;


export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateSurvey);
