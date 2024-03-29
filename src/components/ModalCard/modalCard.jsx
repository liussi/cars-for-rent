import React from 'react';
import {
  SpanUnit,
  ConditionContainer,
  ConditionUnit,
  ConditionDescr,
  DescrTitle,
  AdvDescr,
  ImgContainer,
  Descr,
  DescrContainer,
  InfoContainer,
  Img,
  Span,
  Title,
  Button,
  ButtonLink,
  FuncDescr,
  DescrFunc,
} from './modalCard.styled';
import PropTypes from 'prop-types';
import rentalCar from '../../images/rentalCar.png';

const ModalCard = ({ catalogData }) => {
  const {
    id,
    make,
    year,
    type,
    functionalities,
    address,
    img,
    rentalPrice,
    model,
    mileage,
    accessories,
    description,
    fuelConsumption,
    engineSize,
    rentalConditions,
  } = catalogData;


  const formatConditionAndNumber = text => {
    const fractionalNumber = number => {
      return number.toLocaleString();
    };
    if (typeof text === 'string') {
      const match = text.match(/(\d+)/);
      if (match) {
        const number = match[0];
        const restOfText = text.replace(number, '');
        return (
          <>
            {restOfText}
            <SpanUnit>{fractionalNumber(number)}</SpanUnit>
          </>
        );
      }
    }
    return text;
  };

return (
  <div>
    <ImgContainer>
      {!img ? (
        <Img src={rentalCar} width={461} />
      ) : (
        <Img src={img} alt={`${make}`} width={461} />
      )}
    </ImgContainer>
    <InfoContainer>
      <Title>
        {make} <Span> {model}</Span>, {year}
      </Title>
      <DescrContainer>
        <Descr>
          <span>
            {address} | Id: {id} | Year: {year} | Type: {type}
          </span>
          <span>
            Fuel Consumption: {fuelConsumption} | Engine Size: {engineSize}
          </span>
        </Descr>
      </DescrContainer>
      <AdvDescr>{description}</AdvDescr>
      <FuncDescr>
        <DescrTitle>Accessories and functionalities:</DescrTitle>
        <DescrFunc>
          <span>
            {accessories
              .filter(accessory => typeof accessory === 'string')
              .map(accessory => {
                const words = accessory.split(' ');
                const firstThreeWords = words.slice(0, 3).join(' ');
                return firstThreeWords;
              })
              .join(' | ')}
          </span>
          <span>
            {functionalities
              .filter(functionality => typeof functionality === 'string')
              .map(functionality => {
                const words = functionality.split(' ');
                const firstThreeWords = words.slice(0, 3).join(' ');
                return firstThreeWords;
              })
              .join(' | ')}
          </span>
        </DescrFunc>
      </FuncDescr>
      <ConditionContainer>
        <DescrTitle>Rental Conditions:</DescrTitle>
        <ConditionDescr>
          {rentalConditions &&
            rentalConditions.split('\n').map((condition, index) => (
              <ConditionUnit key={index}>
                {formatConditionAndNumber(condition)}
              </ConditionUnit>
            ))}
          <ConditionUnit>
            Mileage:{' '}
            <SpanUnit>
              {typeof mileage === 'number'
                ? mileage.toLocaleString('en-US')
                : mileage}
            </SpanUnit>
          </ConditionUnit>

          <ConditionUnit>
            Price: <SpanUnit>{rentalPrice.replace('$', '') + '$'}</SpanUnit>
          </ConditionUnit>
        </ConditionDescr>
      </ConditionContainer>

      <Button>
        <ButtonLink href="tel:+380730000000">Rental Car</ButtonLink>
      </Button>
    </InfoContainer>
  </div>
);

};

ModalCard.propTypes = {
  catalogData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    make: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    rentalCompany: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    functionalities: PropTypes.array.isRequired,
    address: PropTypes.string.isRequired,
    img: PropTypes.string,
    rentalPrice: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    mileage: PropTypes.number.isRequired,
    accessories: PropTypes.array.isRequired,
    description: PropTypes.string.isRequired,
    fuelConsumption: PropTypes.string.isRequired,
    engineSize: PropTypes.string.isRequired,
    rentalConditions: PropTypes.string.isRequired,
    children: PropTypes.node, 
  }).isRequired,
};
export default ModalCard;
