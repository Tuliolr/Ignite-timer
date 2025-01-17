import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import {  HomeContainer, StartCountdownContainerButton, StopCountdownContainerButton} from "./style";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'
import {  useContext } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { CyclesContext } from "../../contexts/CyclesContext";


const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(5,'O ciclo precisa ser de no minimo 5 minutos.').max(60, 'O ciclo precisa ser de no maximo 60 minutos.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema >

export function Home() {
    const {activeCycle, createNewCycle, interruptCurrentCycle} = useContext(CyclesContext)
    
    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    const { handleSubmit, watch, reset} = newCycleForm

    function handleCreateNewCycle(data: NewCycleFormData ) {
        createNewCycle(data)
        reset()

    }

     const task = watch('task')
     const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
               
                 <FormProvider {...newCycleForm}>
                 <NewCycleForm />
                </FormProvider>   
                
                <Countdown />
                
                
            
              
               {activeCycle ? (
                     <StopCountdownContainerButton onClick={interruptCurrentCycle} type="button"><HandPalm />Interromper</StopCountdownContainerButton>
               ) : (
                <StartCountdownContainerButton  disabled={isSubmitDisabled}  type="submit"><Play />Começar</StartCountdownContainerButton>
               )}
            </form>
        </HomeContainer>
    )
}