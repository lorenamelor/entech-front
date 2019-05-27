import XDate from 'xdate';

const formatDate = (date: string) => {
  const dateEdited: string | XDate = new XDate(date.toString());
    return dateEdited.toString("dd/MM/yyyy");
}

export default formatDate;