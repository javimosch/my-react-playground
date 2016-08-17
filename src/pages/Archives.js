import React, {
    Component
}
from 'react';

import Article from '../components/Article';

export default class Archives extends Component {
    render() {

        const articles = [
            'Billy',
            'Marzo',
            'Ma'
        ].map((title, i) => <Article key={i} title={title} />);


        const {
            params
        } = this.props;
        const {
            article
        } = params;
        console.log(this.props, params);
        return (
            <div>
                  <h1>Archives {article}</h1>
                  <div class="row"> 
                    {articles}
                  </div>
      </div>
        );
    }
}
