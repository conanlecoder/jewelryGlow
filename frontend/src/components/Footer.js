import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
	return (
		<footer>
			<Container>
				<Row>
					<Col className='text-center py-3'>
						{/* othmane & aymane */}
						<a
							rel='noopener noreferrer'
							href='https://github.com/conanlecoder/jewelryGlow.git'
							target='_blank'
							className='melvin-kisten'
						>
							<i className='fas fa-user-circle'></i> othmane & aymane Github project repository
						</a>
						Copyright &copy; jawelryGlow.git
					</Col>
				</Row>
			</Container>
		</footer>
	)
}

export default Footer
