import { Container, Typography, Box } from '@mui/material'
import ContactButton from '../components/common/ContactButton'

const date = '09/09/2024'

const PrivacyPolicy = () => {
  return (
    <Container>
      <Box sx={{ py: 4 }}>
        {/* English Section */}
        <Box>
          <Typography variant="h4" gutterBottom>
            Privacy Policy
          </Typography>
          <Typography variant="body1" paragraph>
            Effective Date: {date}
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to indieco.blog ("we", "our", "us"). This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website indieco.blog (the "Site"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the Site.
          </Typography>
          <Typography variant="h5" gutterBottom>
            1. Information We Collect
          </Typography>
          <Typography variant="body1" paragraph>
            We only collect minimal information necessary for login purposes. Specifically, we collect your email address and a securely salted and hashed version of your password. No other personal information is collected or stored.
          </Typography>
          <Typography variant="h5" gutterBottom>
            2. Use of Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            The only purpose for collecting your email address and salted password is to facilitate secure login to the Site. Your email address may also be used to send notifications related to your account, such as password recovery.
          </Typography>
          <Typography variant="h5" gutterBottom>
            3. Disclosure of Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            We do not share, sell, or disclose your personal information with third parties, except when required by law or to protect the rights and security of our users or the Site.
          </Typography>
          <Typography variant="h5" gutterBottom>
            4. Security of Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            We use industry-standard security measures to protect your information. All passwords are stored in a securely salted and hashed format, and email addresses are kept confidential. Despite our efforts, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
          </Typography>
          <Typography variant="h5" gutterBottom>
            5. Policy for Children
          </Typography>
          <Typography variant="body1" paragraph>
            We do not knowingly collect information from children under the age of 13. If we learn that we have inadvertently collected such information, we will take steps to delete it promptly.
          </Typography>
          <Typography variant="h5" gutterBottom>
            6. Controls for Do-Not-Track Features
          </Typography>
          <Typography variant="body1" paragraph>
            We do not track users’ online activities over time and across third-party websites, and therefore do not respond to Do-Not-Track (DNT) signals.
          </Typography>
          <Typography variant="h5" gutterBottom>
            7. Options Regarding Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            You can update your email address or request account deletion by contacting us or accessing your account settings. We will delete your account and associated data upon request.
          </Typography>
          <Typography variant="h5" gutterBottom>
            8. Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have questions or concerns about this Privacy Policy, please contact us at: <ContactButton />
          </Typography>
        </Box>

        {/* Spanish Section */}
        <Box>
          <Typography variant="h4" gutterBottom>
            Política de Privacidad
          </Typography>
          <Typography variant="body1" paragraph>
            Fecha de Efecto: {date}
          </Typography>
          <Typography variant="body1" paragraph>
            Bienvenido a indieco.blog ("nosotros", "nuestro", "nos"). Esta política de privacidad explica cómo recopilamos, usamos, divulgamos y protegemos su información cuando visita nuestro sitio web indieco.blog (el "Sitio"). Lea esta política de privacidad detenidamente. Si no está de acuerdo con los términos de esta política de privacidad, no acceda al Sitio.
          </Typography>
          <Typography variant="h5" gutterBottom>
            1. Información que Recopilamos
          </Typography>
          <Typography variant="body1" paragraph>
            Solo recopilamos la información mínima necesaria para el inicio de sesión. Específicamente, recopilamos su dirección de correo electrónico y una versión con sal y hash de su contraseña. No se recopila ni almacena ninguna otra información personal.
          </Typography>
          <Typography variant="h5" gutterBottom>
            2. Uso de Su Información
          </Typography>
          <Typography variant="body1" paragraph>
            El único propósito de recopilar su dirección de correo electrónico y contraseña con hash es facilitar el inicio de sesión seguro en el Sitio. Su dirección de correo electrónico también puede ser utilizada para enviar notificaciones relacionadas con su cuenta, como la recuperación de contraseñas.
          </Typography>
          <Typography variant="h5" gutterBottom>
            3. Divulgación de Su Información
          </Typography>
          <Typography variant="body1" paragraph>
            No compartimos, vendemos ni divulgamos su información personal a terceros, excepto cuando la ley lo exija o para proteger los derechos y la seguridad de nuestros usuarios o el Sitio.
          </Typography>
          <Typography variant="h5" gutterBottom>
            4. Seguridad de Su Información
          </Typography>
          <Typography variant="body1" paragraph>
            Utilizamos medidas de seguridad estándar de la industria para proteger su información. Todas las contraseñas se almacenan de forma segura con sal y hash, y las direcciones de correo electrónico se mantienen confidenciales. A pesar de nuestros esfuerzos, ningún método de transmisión a través de internet o almacenamiento electrónico es completamente seguro, y no podemos garantizar una seguridad absoluta.
          </Typography>
          <Typography variant="h5" gutterBottom>
            5. Política para Niños
          </Typography>
          <Typography variant="body1" paragraph>
            No recopilamos conscientemente información de niños menores de 13 años. Si nos enteramos de que hemos recopilado dicha información inadvertidamente, tomaremos medidas para eliminarla de inmediato.
          </Typography>
          <Typography variant="h5" gutterBottom>
            6. Controles para Características de No Rastreo
          </Typography>
          <Typography variant="body1" paragraph>
            No rastreamos las actividades en línea de los usuarios a lo largo del tiempo y en sitios web de terceros, y por lo tanto, no respondemos a señales de No Rastreo (DNT).
          </Typography>
          <Typography variant="h5" gutterBottom>
            7. Opciones con Respecto a Su Información
          </Typography>
          <Typography variant="body1" paragraph>
            Puede actualizar su dirección de correo electrónico o solicitar la eliminación de su cuenta contactándonos o accediendo a la configuración de su cuenta. Eliminaremos su cuenta y los datos asociados a solicitud.
          </Typography>
          <Typography variant="h5" gutterBottom>
            8. Contáctenos
          </Typography>
          <Typography variant="body1" paragraph>
            Si tiene preguntas o inquietudes sobre esta Política de Privacidad, contáctenos en: <ContactButton />
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default PrivacyPolicy
