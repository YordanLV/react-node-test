import styled from 'styled-components';
import Card from '@material-ui/core/Card';

const InfoCardWrapper = styled.div`
  color: red;
  width: 12.5rem;
  position: fixed;
  right: 0.3125rem;
`;

const StyledCard = styled(Card)`
  padding: 1rem;
  text-align: center;
  span{
    font-size: 2rem;
    font-weight: 600;
  }
`

const InfoCard = ({ label, number, topPostion }) => {
  return (
    <InfoCardWrapper style={{ top: topPostion }}>
      <StyledCard>
        <span>{number}</span>
        <div>---------</div>
        <div>{label}</div>
      </StyledCard>
    </InfoCardWrapper>
  )
}

export default InfoCard