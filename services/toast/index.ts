import Toast from 'react-native-root-toast';


export const successToast = (message: string) => {
    Toast.show(message, {
        containerStyle: {
            backgroundColor: '#4BB543'
        }
    })
}

export const errorToast = (message: string) => {
    Toast.show(message, {
        containerStyle: {
            backgroundColor: '#ff0033'
        }
    })
}