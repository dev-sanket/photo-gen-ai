import React, { useState } from 'react'
import { View, StyleSheet, Image, ScrollView } from 'react-native'
import { Chip, SegmentedButtons, Text, TextInput } from 'react-native-paper'

import { useUser } from '@clerk/clerk-expo'

import { ThemedText } from '@/components/ThemedText'
import CustomButton from '@/components/ui/Button'
import CustomCard from '@/components/ui/Card'

import { AppTheme, useAppTheme } from '@/theme/theme'
import IconButton from '@/components/IconButton'
import { useRouter } from 'expo-router'

const GenerateImagesScreen = () => {
  const theme = useAppTheme()
  const { user } = useUser()
  const router = useRouter()

  const styles = getStyles(theme)

  const [prompt, setPrompt] = useState<string>('')
  const [selectedChip, setSelectedChip] = useState<string>('')
  const [imageStyle, setImageStyle] = useState<string>('realistic')
  const [imageCount, setImageCount] = useState<number>(4)

  const models = [
    {
      id: '1',
      name: 'Rahul',
      imageUrl:
        'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D'
    },
    {
      id: '2',
      name: 'Ram',
      imageUrl:
        'https://st3.depositphotos.com/4071389/16855/i/450/depositphotos_168551948-stock-photo-happy-guy-in-grey-suit.jpg'
    },
    {
      id: '3',
      name: 'Shyam',
      imageUrl:
        'https://st.depositphotos.com/1008939/1326/i/450/depositphotos_13269432-stock-photo-professiona-businessman.jpg'
    },
    {
      id: '5',
      name: 'Raj',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNlXZlMguDa-0yDfWZbxjbWqSu4TCEK8d-gEDkQWIUK3Ox1Sx2VnDyYy6oKpWjw0ALTXY&usqp=CAU'
    },
    {
      id: '6',
      name: 'Rhitam',
      imageUrl:
        'https://thumbs.dreamstime.com/b/portrait-handsome-man-smiling-guy-grey-suit-jacket-90033250.jpg'
    }
  ]

  return (
    <View style={styles.container}>
      <ScrollView style={{}} showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <View style={{ marginTop: theme.spacing.md }}>
            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="Describe the photo you want to generate... (e.g., 'Professional headshot with business attire, smiling, office background')"
              placeholderTextColor="grey"
              numberOfLines={50}
              multiline={true}
              // activeUnderlineColor={theme.colors.background}
              // underlineColor={theme.colors.background}
              activeOutlineColor={theme.colors.primary}
              value={prompt}
              onChangeText={(text: string) => setPrompt(text)}
            />
          </View>
          <CustomCard
            style={{}}
            bodyContainerStyle={styles.cardBody}
            headerChildren={
              <ThemedText type="default" style={styles.cardTitle}>
                Select Model
              </ThemedText>
            }
          >
            {models.map((ele) => (
              <Chip
                key={ele.id}
                mode={selectedChip === ele.id ? 'flat' : 'outlined'}
                selected={selectedChip === ele.id}
                avatar={
                  <Image
                    source={{ uri: ele.imageUrl }}
                    accessibilityIgnoresInvertColors
                  />
                }
                onPress={() => {
                  if (selectedChip === ele.id) {
                    setSelectedChip('')
                  } else {
                    setSelectedChip(ele.id)
                  }
                }}
                // onClose={() => {}}
                style={{
                  padding: theme.spacing.xs,
                  margin: theme.spacing.sm,
                  width: selectedChip === ele.id ? 'auto' : 99,
                  borderRadius: theme.roundness * 5,
                  borderColor:
                    selectedChip === ele.id
                      ? theme.colors.inversePrimary
                      : theme.colors.inverseOnSurface
                }}
                textStyle={{
                  fontSize: theme.fonts.titleMedium.fontSize
                }}
              >
                {ele.name} {selectedChip === ele.id && '(selected)'}
              </Chip>
            ))}
          </CustomCard>
          <CustomCard
            headerChildren={
              <ThemedText type="default" style={styles.cardTitle}>
                Style Options
              </ThemedText>
            }
          >
            <View style={{}}>
              <Text
                variant="labelLarge"
                style={{
                  marginBottom: theme.spacing.sm,
                  color: theme.colors.textLight
                }}
              >
                Image Style
              </Text>
              <SegmentedButtons
                value={imageStyle}
                onValueChange={setImageStyle}
                buttons={[
                  { value: 'realistic', label: 'Realistic' },
                  { value: 'cartoon', label: 'Cartoon' },
                  { value: 'abstract', label: 'Abstract' }
                ]}
              />
            </View>
            <View
              style={{ flexDirection: 'column', marginTop: theme.spacing.md }}
            >
              <Text
                variant="labelLarge"
                style={{
                  marginBottom: theme.spacing.sm,
                  color: theme.colors.textLight
                }}
              >
                Number of Images (5 coins each)
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <IconButton
                  icon="minus"
                  size={18}
                  onPress={() => {
                    console.log('minus')
                    setImageCount(Math.max(1, imageCount - 1))
                  }}
                  style={[styles.counterButton, styles.leftPos]}
                />
                <Text
                  variant="headlineMedium"
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    borderWidth: 1,
                    borderColor: theme.colors.backdrop,
                    borderRadius: theme.roundness * 2,
                    paddingHorizontal: theme.spacing.md
                  }}
                >
                  {imageCount}
                </Text>
                <IconButton
                  icon="plus"
                  size={18}
                  onPress={() => setImageCount(imageCount + 1)}
                  style={[
                    styles.counterButton,
                    styles.rightPos,
                    {
                      borderColor: theme.colors.primary,
                      backgroundColor: theme.colors.primary
                    }
                  ]}
                />
              </View>
            </View>
          </CustomCard>
          <View
            style={{
              // padding: theme.spacing.md,
              bottom: -theme.spacing.xxl
            }}
          >
            <CustomButton
              text="Generate Image (20 coins)"
              onPress={() => router.push('/(tabs)/(generate)/preview-image')}
              loading={false}
              disable={false}
            />
          </View>
        </View>
        <View style={{ height: 70 }}></View>
      </ScrollView>
    </View>
  )
}
const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background
    },
    body: {
      flex: 1,
      padding: theme.spacing.md
    },
    textArea: {
      minHeight: 150,
      justifyContent: 'flex-start',
      backgroundColor: theme.colors.background,
      borderBottomWidth: 0,
      fontSize: theme.fonts.titleMedium.fontSize,
      fontWeight: theme.fonts.titleMedium.fontWeight,
      borderRadius: theme.roundness * 2,

      // Android Shadow
      elevation: 4,
      // iOS Shadow
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84
    },
    cardTitle: {
      marginTop: theme.spacing.sm,
      color: theme.colors.text,
      fontSize: theme.fonts.labelLarge.fontSize,
      fontWeight: theme.fonts.labelLarge.fontWeight
    },
    cardBody: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start'
    },
    counterButton: {
      padding: theme.spacing.xs,
      position: 'absolute',
      borderWidth: 1,
      borderRadius: 20,
      backgroundColor: theme.colors.backdrop,
      borderColor: theme.colors.backdrop
    },
    rightPos: {
      right: 5,
      top: 5
    },
    leftPos: {
      left: 5,
      top: 5
    }
  })

export default GenerateImagesScreen
