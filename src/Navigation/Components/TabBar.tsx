import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { default as FAIcon } from 'react-native-vector-icons/FontAwesome'

export const TabBar = ({ state, navigation }: any) => {
    const getIcon = (name: string) => {
        const iconDictionary: IconDictionary = {
            Home: (
                <View>
                    <Icon name='dog' size={38} color={'#ad7203'} />
                </View>
            ),
            Profile: (
                <View>
                    <FAIcon name='user' size={35} color={'#00028c'} />
                </View>
            ),
            Likes: (
                <View>
                    <FAIcon name='heart' size={30} color={'#eb495e'} />
                </View>
            ),
        }

        return iconDictionary[name]
    }

    return (
        <View style={styles.tabBarContainer}>
            {state.routes.map((route: any, index: any) => {
                const isFocused = state.index === index
                const tapped = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    })

                    if (!isFocused && !event?.defaultPrevented) {
                        navigation.navigate(route.name)
                    }
                }
                return (
                    <TouchableOpacity
                        key={route.name}
                        activeOpacity={1}
                        onPress={tapped}
                        style={styles.iconButton}
                    >
                        <View style={{ opacity: isFocused ? 1 : 0.5 }}>
                            {getIcon(route.name)}
                        </View>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    tabBarContainer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        height: 70,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        elevation: 10,
        shadowOpacity: 0.25,
        shadowRadius: 10,
        width: '100%',
    },

    iconButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
})
