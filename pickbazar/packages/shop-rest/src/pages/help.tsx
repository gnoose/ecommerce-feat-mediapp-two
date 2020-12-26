import React from 'react';
import styled from 'styled-components';
import { Modal } from '@redq/reuse-modal';
import { SEO } from 'components/seo';
// import Footer from 'layouts/footer';
import Accordion from 'components/accordion/accordion';

const accordionData = [
  {
    id: 1,
    intlTitleId: 'faqNo1Title',
    intlDetailsId: 'faqNo1Desc',
    values: { number1: 7, number2: 2 },
  },
  {
    id: 2,
    intlTitleId: 'faqNo2Title',
    intlDetailsId: 'faqNo2Desc',
  },
  {
    id: 3,
    intlTitleId: 'faqNo3Title',
    intlDetailsId: 'faqNo3Desc',
  },
  {
    id: 4,
    intlTitleId: 'faqNo4Title',
    intlDetailsId: 'faqNo4Desc',
  },
];

const Heading = styled.h3`
  font-size: 21px;
  font-weight: 700;
  color: #0d1136;
  line-height: 1.2;
  margin-bottom: 25px;
  margin-top: 25px;
  width: 100%;
  text-align: center;
`;
const SubHeading = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #0d1136;
  line-height: 1.2;
  margin-bottom: 10px;
  width: 100%;
  text-align: left;
`;
const HelpPageWrapper = styled.div`
  background-color: #f7f7f7;
  position: relative;
  padding: 90px 0 60px 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 989px) {
    padding-top: 70px;
  }
`;

export const HelpPageContainer = styled.div`
  background-color: transparent;
  padding: 0;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  @media (min-width: 990px) {
    width: 870px;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 989px) {
    padding: 30px;
  }
`;

export default function help () {
  return (
    <Modal>
      <SEO title="F.A.Q - MedsMitra" description="F.A.Q Details" />
      <HelpPageWrapper>
      <Heading>F.A.Q</Heading>
      <HelpPageContainer>
          <div  style={{width:'40%', float: 'left',marginBottom: '10px', marginLeft: '70px'}}><SubHeading>Email</SubHeading> </div>
          <div style={{marginBottom: '10px', width:'20%', float: 'right'}}><SubHeading>Contact</SubHeading></div> 
          <div  style={{width:'40%', float: 'left',  marginLeft: '70px', marginBottom: '20px'}}>care@medsmitra.com  </div>
          <div style={{width:'20%', float: 'right',marginBottom: '20px'}}>+919510361416 </div> 
      </HelpPageContainer>
        <HelpPageContainer>
          <Accordion items={accordionData} />
        </HelpPageContainer>
        {/* <Footer /> */}
      </HelpPageWrapper>
    </Modal>
  );
}
