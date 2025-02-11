import { Button, Stack, Typography } from '@mui/material';
import { Client, LoginFormValues } from '@shared';
import { Form, Formik, FormikHelpers } from 'formik';

import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { authActions } from '../../redux/slices/authSlice';
import { LoginValidationSchema } from '../../utils/validations/validationSchemas';
import { AuthFormWrapper } from '../StyledComponents';
import { ToastManager } from '../Toast/ToastManager';

function LoginForm() {
	const dispatch = useDispatch();

	const handleFormSubmit = (
		values: LoginFormValues,
		{ resetForm }: FormikHelpers<LoginFormValues>
	) => {
		if (window.mp) {
			console.log(Client.Events.Auth.Login);
			console.log(values);
			mp.events
				.callProc(Client.Events.Auth.Login, JSON.stringify(values))
				.then((resultString) => {
					const result = JSON.parse(resultString);
					if (result.account) {
						mp.trigger(Client.Events.Auth.StopAuthCameras);
						mp.trigger(Client.Events.CharacterSelector.Start);

						dispatch(
							authActions.setAuthInfo({
								username: result.account.username,
								email: result.account.email,
								role: result.account.role,
								characters: result.account.characters
							})
						);

						ToastManager.instance.success('Logged in!');
					} else {
						result.msgs.map((msg: string) => {
							ToastManager.instance.warning(msg);
						});
					}
				})
				.catch((error) => console.log(error));
		}
		resetForm();
	};

	return (
		<AuthFormWrapper>
			<Stack sx={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: '2rem' }}>
				<Typography fontSize={20} fontWeight={'bold'}>
					Welcome!
				</Typography>
			</Stack>

			<Formik
				initialValues={{ username: 'test1', password: 'password' }}
				onSubmit={handleFormSubmit}
				validationSchema={LoginValidationSchema}
			>
				{(formik) => (
					<Form>
						<Stack sx={{ gap: '2rem' }}>
							<Stack sx={{ gap: '1rem' }}>
								<TextField
									id="outlined-error-helper-text1"
									size="small"
									label="Username"
									type="text"
									name="username"
									placeholder="Username....."
									value={formik.values.username}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.username && Boolean(formik.errors.username)
									}
									helperText={formik.touched.username && formik.errors.username}
								/>

								<TextField
									id="outlined-error-helper-text2"
									size="small"
									label="Password"
									type="password"
									name="password"
									placeholder="Password....."
									value={formik.values.password}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.password && Boolean(formik.errors.password)
									}
									helperText={formik.touched.password && formik.errors.password}
								/>
							</Stack>

							{
								<Button
									variant="contained"
									type="submit"
									disabled={formik.isSubmitting}
									fullWidth
								>
									{formik.isSubmitting ? 'Processing...' : 'Sign in'}
								</Button>
							}
						</Stack>
					</Form>
				)}
			</Formik>
		</AuthFormWrapper>
	);
}

export default LoginForm;
