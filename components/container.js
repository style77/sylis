import { Flex, FlexProps } from '@chakra-ui/react'

export const Container = (props) => (
    <Flex
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        bg="gray.900"
        color="gray.100"
        transition="all 0.15s ease-out"
        {...props}
    />
)