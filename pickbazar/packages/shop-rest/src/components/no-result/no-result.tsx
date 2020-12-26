import React from 'react';
import { useRouter } from 'next/router';
import NoResultSvg from './no-result.svg';
import {
  NoResultWrapper,
  ImageWrapper,
  ButtonWrapper,
} from './no-result.style';
import { ArrowPrev } from 'assets/icons/ArrowPrev';
import { Button } from 'components/button/button';
import { Input } from 'components/forms/input';
// import { SearchContext } from 'contexts/search/search.context';
import { FormattedMessage, useIntl } from 'react-intl';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { SEARCHPRODUCT } from 'endpoints';

type NoResultFoundProps = {
  id?: string;
};

const NoResultFound: React.FC<NoResultFoundProps> = ({ id }) => {
  const router = useRouter();
  const intl = useIntl();
  const [mobile, setMobile] = React.useState('');
  const cookies = new Cookies();
  const href = router.pathname;

  const config = {
    headers: { Authorization: `Bearer  ${cookies.get('access_token')}` }
  };

  function onClickButton() {
    let payload = { "mobile": `${mobile}`, "search_product": router.query.text }
    axios.post(SEARCHPRODUCT, payload, config).then(response => {
      // router.push(href, href, { shallow: true });
    });
    // dispatch({
    //   type: 'RESET',
    // });
    // const href = router.pathname;

    // router.push(href, href, { shallow: true });
  }

  function postRequirement() {
    if (typeof window !== 'undefined') {
      // Need to post data to API <here className=""></here>
    }
  }

  return (
    <NoResultWrapper id={id}>
      <h3>
        <FormattedMessage
          id="specialRequest"
          defaultMessage="This is a Special Order Request"
        />
      </h3>
      <h5>
        <FormattedMessage
          id="noResultFound"
          defaultMessage="Enter Your Contact details below and our health advisor will call you"
        />
      </h5>

      <form onSubmit={postRequirement}>
          <Input
            type='text'
            placeholder='9989998989'
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            height='48px'
            backgroundColor='#F7F7F7'
            mb='10px'
          />

          <Button
            onClick={onClickButton}
            variant='primary'
            size='big'
            style={{ width: '100%' }}
            type='submit'
          >
            <FormattedMessage id='Continue' defaultMessage='Submit' />
          </Button>
        </form>

      {/* <ImageWrapper>
        <img src={NoResultSvg} alt="No Result" />
      </ImageWrapper> */}

      {/* <ButtonWrapper>
        <div onClick={onClickButton}>
          <Button>
            <ArrowPrev /> Go Back
          </Button>
        </div>
      </ButtonWrapper> */}
    </NoResultWrapper>
  );
};

export default NoResultFound;
