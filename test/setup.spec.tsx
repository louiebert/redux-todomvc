import * as chai from 'chai';
import * as chaiImmutable from 'chai-immutable';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

chai.use(chaiImmutable);
