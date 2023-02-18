import React from 'react'
import "../YoutubeForm/YoutubeForm.css";
import { useFormik } from 'formik'
import * as Yup from 'yup'


const initialValues = {
    name: "",
    email: "",
    channel: ""
}

const onSubmit = values => {
    console.log("Form Data", values);
}

const validate = values => {
    let errors = {}

    if (!values.name) {
        errors.name = 'Required'
    }

    if (!values.email) {
        errors.email = 'Required'
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invaild email format'
    }

    if (!values.channel) {
        errors.channel = 'Required'
    }
    return errors
}

const validationSchema = Yup.object({
    name:Yup.string().required('Required'),
    email:Yup.string().email('Invalid Email Format').required('Required'),
    channel:Yup.string().required('Required')
})

const OldYotubeForm = () => {

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema //Validation Using Yup
        // validate  //Validation using formik
    })

    // console.log("Form Values", formik.values)
    // console.log('Form errors', formik.errors)
    // console.log('Visited fields',formik.touched)

    return (
        <div className='App'>
            <form onSubmit={formik.handleSubmit}>
                <div className='form-control'>
                    <label htmlFor='name'>Name</label>
                    <input type='text'
                        id='name'
                        name='name'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name} />
                    {formik.touched.name && formik.errors.name ?
                        (<div className="error">{formik.errors.name}</div>) : null}
                </div>

                <div className='form-control'>
                    <label htmlFor='email'>E-mail</label>
                    <input type='email'
                        id='email'
                        name='email'
                        // onBlur={formik.handleBlur}
                        // onChange={formik.handleChange}
                        // value={formik.values.email} 
                        {...formik.getFieldProps('email')}/>
                    {formik.touched.email && formik.errors.email ?
                        (<div className="error">{formik.errors.email}</div>) : null}
                </div>

                <div className='form-control'>
                    <label htmlFor='channel'>Channel</label>
                    <input type='text'
                        id='channel'
                        name='channel'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.channel} />
                    {formik.touched.channel && formik.errors.channel ?
                        (<div className="error">{formik.errors.channel}</div>) : null}
                </div>

                <button type="submit">Submit</button>

            </form>

        </div>
    )
}

export default OldYotubeForm