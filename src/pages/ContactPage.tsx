import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useSearch } from "wouter";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { enUS, ro } from "date-fns/locale";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Mail, MessageCircle, Facebook, Instagram, CalendarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { serviceData } from "@/data/serviceData";
import { packagesData } from "@/data/packageData";
import emailjs from '@emailjs/browser';

const DATE_FORMAT = "dd-MM-yyyy";
// The event date is always labelled in Romanian in the email, since the
// notification is read by the Taisha team rather than by the visitor.
const EMAIL_DATE_LABEL = "Data evenimentului";
const EMAIL_DATE_UNDECIDED = "Încă nu este stabilită";

const ContactPage = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const search = useSearch();
  const [isSending, setIsSending] = useState(false);

  const calendarLocale = i18n.language?.startsWith("ro") ? ro : enUS;

  // Services and packages are offered as one grouped dropdown so a visitor
  // arriving from a detail page finds their selection already applied.
  const serviceOptions = useMemo(
    () => Object.values(serviceData).map((service) => ({
      value: service.id,
      label: t(`services.${service.id}.title`),
    })),
    [t]
  );

  const packageOptions = useMemo(
    () => Object.values(packagesData).map((pkg) => ({
      value: `package-${pkg.id}`,
      label: t(`packages.${pkg.id}.title`),
    })),
    [t]
  );

  const serviceLabels = useMemo(() => {
    const labels = new Map<string, string>();
    [...serviceOptions, ...packageOptions].forEach(({ value, label }) => labels.set(value, label));
    labels.set("other", t("contact.form.services.other"));
    return labels;
  }, [serviceOptions, packageOptions, t]);

  const formSchema = z.object({
    name: z.string().min(2, { message: t("contact.form.validation.nameRequired") }),
    email: z.string().email({ message: t("contact.form.validation.emailInvalid") }),
    phone: z.string().min(6, { message: t("contact.form.validation.phoneRequired") }),
    service: z.string().optional(),
    eventDate: z.date().optional(),
    dateNotSure: z.boolean(),
    message: z.string().min(10, { message: t("contact.form.validation.messageShort") }),
  }).refine((data) => data.dateNotSure || !!data.eventDate, {
    path: ["eventDate"],
    message: t("contact.form.eventDateRequired"),
  });

  const defaultValues = {
    name: "",
    email: "",
    phone: "",
    service: "",
    eventDate: undefined,
    dateNotSure: false,
    message: "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Preselect the service when arriving from a "Request this service" button
  const requestedService = new URLSearchParams(search).get("service");
  useEffect(() => {
    if (requestedService && serviceLabels.has(requestedService)) {
      form.setValue("service", requestedService);
    }
  }, [requestedService, serviceLabels, form]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const eventDateValue = data.dateNotSure || !data.eventDate
      ? EMAIL_DATE_UNDECIDED
      : format(data.eventDate, DATE_FORMAT);
    const eventDateLine = `${EMAIL_DATE_LABEL}: ${eventDateValue}`;

    // Clear the form and announce the send straight away, so the visitor never
    // waits on a silent button. The values are kept so they can be restored if
    // the request fails.
    setIsSending(true);
    form.reset(defaultValues);
    toast({
      title: t("contact.form.sending.title"),
      description: t("contact.form.sending.description"),
    });

    try {
      const result = await emailjs.send(
        'zoho_taisha_smtp',
        'template_2x6ikqs',
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          service: data.service ? serviceLabels.get(data.service) ?? data.service : "",
          event_date: eventDateValue,
          message: `${data.message}\n\n${eventDateLine}`,
        },
        'dL93QDuUB_gKPv1fR'
      );

      toast({
        title: t("contact.form.sent.title"),
        description: t("contact.form.sent.description"),
      });

      console.log(result.text);
    } catch (error) {
      console.error('Email send error:', error);
      form.reset(data);
      toast({
        title: t("contact.form.failed.title"),
        description: t("contact.form.failed.description"),
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };


  return (
    <section className="min-h-screen py-28 bg-black">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">{t("contact.title")}</h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-light-gray max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-dark-gray p-8 rounded-lg mb-8">
              <h3 className="font-playfair text-2xl font-semibold text-gold mb-6">{t("contact.getInTouch")}</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-gold mt-1">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">{t("contact.location.title")}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="text-gold mt-1">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">{t("contact.phone.title")}</h4>
                    <p className="text-light-gray">{t("contact.phone.number")}</p>
                    <p className="text-light-gray text-sm">{t("contact.phone.hours")}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="text-gold mt-1">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">{t("contact.email.title")}</h4>
                    <p className="text-light-gray">{t("contact.email.info")}</p>
                  </div>
                </div>
                
                {/* <div className="flex items-start gap-4">
                  <div className="text-gold mt-1">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">{t("contact.hours.title")}</h4>
                    <p className="text-light-gray">{t("contact.hours.weekdays")}</p>
                    <p className="text-light-gray">{t("contact.hours.weekend")}</p>
                  </div>
                </div> */}
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-6">
              <a href="#" className="w-10 h-10 rounded-full bg-dark-purple flex items-center justify-center text-white hover:bg-gold transition-colors duration-300" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-dark-purple flex items-center justify-center text-white hover:bg-gold transition-colors duration-300" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-dark-purple flex items-center justify-center text-white hover:bg-gold transition-colors duration-300" aria-label="WhatsApp">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
          
          <motion.div
            className="bg-dark-gray p-8 rounded-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="font-playfair text-2xl font-semibold text-gold mb-6">{t("contact.form.title")}</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-sm">{t("contact.form.name")}</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="w-full bg-black border border-dark-purple rounded-sm px-4 py-6 text-white focus:border-gold focus:outline-none transition-colors" 
                          />
                        </FormControl>
                        <FormMessage className="text-white italic" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-sm">{t("contact.form.email")}</FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            type="email"
                            className="w-full bg-black border border-dark-purple rounded-sm px-4 py-6 text-white focus:border-gold focus:outline-none transition-colors" 
                          />
                        </FormControl>
                        <FormMessage className="text-white italic" />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-sm">{t("contact.form.phone")}</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          type="tel"
                          className="w-full bg-black border border-dark-purple rounded-sm px-4 py-6 text-white focus:border-gold focus:outline-none transition-colors" 
                        />
                      </FormControl>
                      <FormMessage className="text-white italic" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-sm">{t("contact.form.interest")}</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full bg-black border border-dark-purple rounded-sm px-4 py-6 text-white focus:border-gold focus:outline-none transition-colors">
                            <SelectValue placeholder={t("contact.form.selectService")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-black border border-dark-purple text-white">
                          <SelectGroup>
                            <SelectLabel className="text-gold">{t("contact.form.servicesGroup")}</SelectLabel>
                            {serviceOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                          <SelectGroup>
                            <SelectLabel className="text-gold">{t("contact.form.packagesGroup")}</SelectLabel>
                            {packageOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                          <SelectItem value="other">{t("contact.form.services.other")}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-white italic" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="eventDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-sm">{t("contact.form.eventDate")}</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild disabled={form.watch("dateNotSure")}>
                          <FormControl>
                            <button
                              type="button"
                              className="w-full flex items-center justify-between bg-black border border-dark-purple rounded-sm px-4 py-4 text-left text-white focus:border-gold focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <span className={field.value ? "" : "text-light-gray"}>
                                {field.value
                                  ? format(field.value, DATE_FORMAT)
                                  : t("contact.form.eventDatePlaceholder")}
                              </span>
                              <CalendarIcon className="h-4 w-4 text-gold" />
                            </button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-black border border-dark-purple text-white" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={{ before: new Date() }}
                            locale={calendarLocale}
                            autoFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormField
                        control={form.control}
                        name="dateNotSure"
                        render={({ field: notSureField }) => (
                          <FormItem className="flex flex-row items-center gap-2 pt-2">
                            <FormControl>
                              <Checkbox
                                checked={notSureField.value}
                                onCheckedChange={(checked) => {
                                  const isChecked = checked === true;
                                  notSureField.onChange(isChecked);
                                  if (isChecked) {
                                    form.setValue("eventDate", undefined);
                                    form.clearErrors("eventDate");
                                  }
                                }}
                                className="border-gold data-[state=checked]:bg-gold"
                              />
                            </FormControl>
                            <FormLabel className="text-light-gray text-sm font-normal cursor-pointer">
                              {t("contact.form.notSure")}
                            </FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormMessage className="text-white italic" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-sm">{t("contact.form.message")}</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field}
                          rows={4}
                          className="w-full bg-black border border-dark-purple rounded-sm px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors resize-none" 
                        />
                      </FormControl>
                      <FormMessage className="text-white italic" />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-dark-purple hover:bg-opacity-80 text-white py-6 rounded-sm transition-colors duration-300 border border-gold disabled:opacity-70"
                >
                  {isSending ? t("contact.form.sending.title") : t("contact.form.send")}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
