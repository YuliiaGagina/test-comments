import storage from '../helpers/storage';
import React from 'react';
import { useFormik } from 'formik';
import { addComment } from '../store/reducers/ActionCreaters';
import { useAppDispatch } from '../hooks/redux';
import { DebounceInput } from 'react-debounce-input';
import { useEffect } from 'react';


interface FormData {
  body: string;
  postId: string;
  userId: string;
}


const FormForAddComments = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      body:   storage.load('comment') || "",
      postId: '',
      userId: '',
    },
    onSubmit: (values: FormData) => {
      const comment = {
        body: values.body,
        postId: Math.floor(Math.random() * 50) + 1,
        userId: Math.floor(Math.random() * 100) + 1,
      };

      dispatch(addComment(comment));

      
        storage.save('comment', "");
        formik.resetForm();
         formik.setFieldValue('body', '');
       
    },
  });
    
      useEffect(() => {
    storage.save('comment', formik.values.body);
   
  }, [formik.values.body]);

  return (
    <div>
      <form className='form' onSubmit={formik.handleSubmit}>
         <DebounceInput className='textarea'
          element="textarea"
          debounceTimeout={300}
          name="body"
          id="body"
          placeholder="Your comment"
          value={formik.values.body}
          onChange={formik.handleChange}
        />

        <button className='sendbutton' type="submit">Send</button>
      </form>
    </div>
  );
};

export default FormForAddComments;