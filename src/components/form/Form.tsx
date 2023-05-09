import React from 'react';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

interface AppFormProps {
  initialValues: any;
  onSubmit: (values: any) => void;
  validationSchema?: Yup.ObjectSchema<any>;
  children: React.ReactNode;
  onEnter?: () => void;
}

function AppForm({ initialValues, onSubmit, validationSchema, children, onEnter }: AppFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      className='flex-row'
    >
      {({ handleSubmit }: FormikProps<any>) => (
        <form
          onSubmit={handleSubmit}
          onKeyPress={(event) => {
            if (event.key === 'Enter' && onEnter) {
              event.preventDefault();
              onEnter();
            }
          }}
        >
          {children}
        </form>
      )}
    </Formik>
  );
}

export default AppForm;
