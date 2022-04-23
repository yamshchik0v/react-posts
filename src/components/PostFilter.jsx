import React from 'react';
import MyInput from './UI/input/MyInput';
import MySelect from './UI/select/MySelect';

const Postfilter = ({filter, setFilter}) => {
   return (
      <div>
        <MyInput 
          placeholder="Search..."
          value={filter.query}
          onChange={e => setFilter({...filter, query: e.target.value})}
        />

        <MySelect 
          value={filter.sort}
          onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
          defaultValue='Sort by'
          options={[
            {name: 'by title', value: 'title'},
            {name: 'by description', value: 'body'}
          ]}
        />

      </div>
   );
}

export default Postfilter;
