import React from 'react'
import { Composition, Only } from 'atomic-layout'
import {  Image, Button} from '../components/Dødsbo/'

const HouseIcon = ({ title, location, imageUrl }) => (
    <Card>
      <Composition
        template={templateMobile}
        templateMd={templateTablet}
        templateLg={templateMobile}
        templateColsMdOnly="minmax(100px, 1fr) 1fr"
        padding={15}
        gutter={15}
        gutterLg={25}
      >
        {({ Thumbnail, Heading, Actions }) => (
          <>
            <Thumbnail>
              <Image src="images/Icon.jpg" />
            </Thumbnail>
            {/* <Heading>
              <h3>{title}</h3>
            </Heading> */}
            <Actions flex align="flex-end">
              <Only from="md" marginRight={10}>
                <Button.Map />
              </Only>
              <Button wide>Velg</Button>
            </Actions>
          </>
        )}
      </Composition>
    </Card>
  )


  export default HouseIcon