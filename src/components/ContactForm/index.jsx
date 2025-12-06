import React from "react";
import style from "./index.module.scss";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Grid, Input, TextField } from "@mui/material";

const ContactForm = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      companyName: "",
      email: "",
      mobileNo: "",
      url: "",
      msg: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  return (
    <>
      <div className={style.formContactWrap}>
        <div className={style.innerWrapp}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <div className={style.inputWrap}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        required
                        label="Your Name"
                        variant="standard"
                        {...field}
                      />
                    )}
                  />
                </div>
              </Grid>
              <Grid size={6}>
                <div className={style.inputWrap}>
                  <Controller
                    name="companyName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label="Comapany Name"
                        variant="standard"
                        {...field}
                      />
                    )}
                  />
                </div>
              </Grid>
              <Grid size={6}>
                <div className={style.inputWrap}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        required
                        label="E-mail"
                        variant="standard"
                        {...field}
                      />
                    )}
                  />
                </div>
              </Grid>

              <Grid size={6}>
                <div className={style.inputWrap}>
                  <Controller
                    name="mobileNo"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        required
                        label="Mobile Number"
                        variant="standard"
                        {...field}
                      />
                    )}
                  />
                </div>
              </Grid>
              <Grid size={6}>
                <div className={style.inputWrap}>
                  <Controller
                    name="url"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label="Website URL"
                        variant="standard"
                        {...field}
                      />
                    )}
                  />
                </div>
              </Grid>
              <Grid size={12}>
                <div className={style.inputWrap}>
                  <Controller
                    name="msg"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        variant="standard"
                        label="Your Message"
                        multiline
                        rows={4}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Grid>
            </Grid>

            <button className={style.submitBtn} type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
