import * as React from 'react';
import { Dispatch } from 'redux';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { IRootState } from '../store';

import { Modal, TextField, Button } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Text } from '../components';

import { ITechShot } from '../utils/interfaces';
import { techshotCreate, techshotEdit, selectTechshot, techshotRequestById } from '../store/techShot';
import { getUser } from '../store/user';


interface IProps {
  open: boolean;
  handleClose: () => void;
  techshotId?: string;
  surveyId: string;
}

const validationForm = Yup.object().shape({
  title: Yup.string().required("Campo obrigatório"),
  duration: Yup.string().required("Campo obrigatório"),
  description: Yup.string().required("Campo obrigatório"),
  speaker: Yup.string().required("Campo obrigatório"),
  photoURL: Yup.string(),
  keywords: Yup.array(),
});

const initialValues = {
  title: '',
  duration: 0,
  description: '',
  photoURL: '',
  speaker: '',
  keywords: [],
}

class ModalCreateTeachShot extends React.PureComponent<IProps & IMapDispatchToProps & IMapStateToProps> {

  public componentDidMount() {
    const { techshotId } = this.props;

    if (techshotId) {
      this.props.techshotRequestById(techshotId);
    }
  }

  public render() {
    const { open, handleClose, techshot, techshotId, surveyId } = this.props;
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
                  userId: getUser('_id'),
                  surveyId
                }

                techshotId
                  ? this.props.techshotEdit(payload, techshotId)
                  : this.props.techshotCreate(payload);
                handleClose();
              }}
            >
              {({ errors, touched, values: {
                title,
                duration,
                speaker,
                description,
                photoURL,
                keywords,
              },
                handleChange, setFieldTouched, setFieldValue }) => {

                const change = (nameInput: any, e: any) => {
                  if (nameInput === 'keywords') {
                    const value = [...keywords!, e];
                    setFieldValue('keywords', value)
                    handleChange(value);
                  } else {
                    e.persist();
                    handleChange(e);
                  }

                  setFieldTouched(nameInput, true, false);
                };

                const deleteKeyword = (chip: any, index: any) => {
                  const value = keywords!.filter((val: any, idx: any) => idx !== index)
                  setFieldValue('keywords', value)
                  handleChange(value);
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
                      rows="4"
                      rowsMax="4"
                    />

                    <Input
                      label="Palestrante"
                      name='speaker'
                      value={speaker}
                      helperText={touched.speaker ? errors.speaker : ""}
                      error={touched.speaker && Boolean(errors.speaker)}
                      onChange={change.bind(null, "speaker")}
                      width="55%"
                    />

                    <Input
                      label="Duração"
                      name="duration"
                      type="number"
                      value={duration}
                      helperText={touched.duration ? errors.duration : ""}
                      error={touched.duration && Boolean(errors.duration)}
                      onChange={change.bind(null, "duration")}
                      width="20%"
                    />

                    <input
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
                    </label>

                    <InputChip
                      defaultValue={keywords}
                      name='keywords'
                      label='Palavras Chaves'
                      onAdd={change.bind(null, "keywords")}
                      onDelete={(chip: any, index: any) => deleteKeyword(chip, index)}
                      value={keywords}
                      width="100%"
                    />

                    <ContainerButton>
                      <Btn onClick={handleClose} cancel>Cancelar</Btn>
                      <Btn type="submit">Salvar</Btn>
                    </ContainerButton>
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
  techshot: ITechShot;
};

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  techshot: selectTechshot(state),
});

interface IMapDispatchToProps {
  techshotCreate: (payload: ITechShot) => void;
  techshotEdit: (payload: ITechShot, techshotId: string) => void;
  techshotRequestById: (techshotId: string) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
  techshotCreate: (payload: ITechShot) => dispatch(techshotCreate.started(payload)),
  techshotEdit: (payload: ITechShot, techshotId: string) => dispatch(techshotEdit.started({ payload, techshotId })),
  techshotRequestById: (techshotId: string) => dispatch(techshotRequestById.started({ techshotId })),
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

const Input: any = styled(TextField)<{ width: string }>`
&&{
  margin: 5px;
  width: ${props => props.width};
}
` as typeof TextField;

const InputChip: any = styled(ChipInput)<{ width: string }>`
&&{
  margin: 5px;
  width: ${props => props.width};
}
` as typeof ChipInput;

const ContainerButton = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Btn: any = styled(Button)<{ cancel: boolean }>`
&&{
  margin-top: 20px;
  width: 48%;
  background-color: ${props => props.cancel ? props.theme.colors.gray40 : props.theme.colors.primary};
  color: ${props => props.theme.colors.white}
}`;

const BtnUpload: any = styled(Button)`
&&{
  margin-top: 15px;
  width: 20%;
  color: ${props => props.theme.colors.gray60}
}
` as typeof Button;


export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateTeachShot);
